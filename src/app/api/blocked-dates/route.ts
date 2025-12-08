import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, where, deleteDoc } from "firebase/firestore";
import { eachDayOfInterval, format, addDays, parse } from "date-fns";

// --- CONFIGURACIÓN ---
const COLLECTION_NAME = "blocked_dates";

// Leemos la URL desde la variable de entorno
const AIRBNB_ICAL_URL = process.env.AIRBNB_ICAL_URL;

// Variables para caché
let cachedAirbnbDates: string[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

/**
 * Función auxiliar para obtener y procesar fechas de Airbnb
 */
async function getAirbnbDates() {
  // Validación: Si no existe la variable de entorno, avisamos en consola
  if (!AIRBNB_ICAL_URL) {
    console.warn("⚠️ FALTA LA VARIABLE DE ENTORNO 'AIRBNB_ICAL_URL' EN .ENV.LOCAL");
    return [];
  }

  const now = Date.now();
  if (now - lastFetchTime < CACHE_DURATION && cachedAirbnbDates.length > 0) {
    return cachedAirbnbDates;
  }

  try {
    const response = await fetch(AIRBNB_ICAL_URL);
    if (!response.ok) throw new Error(`Error ${response.status} al conectar con Airbnb`);
    
    const icalData = await response.text();
    const dates = new Set<string>();

    // Regex para eventos iCal estándar
    const eventRegex = /DTSTART;VALUE=DATE:(\d{8})[\s\S]*?DTEND;VALUE=DATE:(\d{8})/g;
    
    let match;
    while ((match = eventRegex.exec(icalData)) !== null) {
      const startStr = match[1];
      const endStr = match[2];

      const startDate = parse(startStr, "yyyyMMdd", new Date());
      const endDate = parse(endStr, "yyyyMMdd", new Date());

      const interval = eachDayOfInterval({
        start: startDate,
        end: addDays(endDate, -1) // El día de salida (checkout) queda libre
      });

      interval.forEach(date => {
        dates.add(format(date, "yyyy-MM-dd"));
      });
    }

    cachedAirbnbDates = Array.from(dates);
    lastFetchTime = now;
    return cachedAirbnbDates;

  } catch (error) {
    console.error("Error obteniendo calendario Airbnb:", error);
    return cachedAirbnbDates; // Retorna caché anterior en caso de fallo
  }
}

/**
 * MÉTODO GET:
 * AHORA SOLO DEVUELVE AIRBNB (Prioridad Absoluta)
 */
export async function GET() {
  try {
    // 1. Fechas desde Airbnb
    const airbnbDates = await getAirbnbDates();

    // CAMBIO IMPORTANTE:
    // Ya NO mezclamos con Firebase. Si tu cliente solo usa Airbnb, 
    // ignoramos cualquier bloqueo manual antiguo para asegurar que la web sea
    // una COPIA EXACTA del calendario de Airbnb.
    
    // Si quisieras volver a mezclar, descomenta las líneas de abajo, pero
    // tal como lo pides ("Airbnb manda"), devolvemos solo airbnbDates.
    
    /* const blockedDatesRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(blockedDatesRef);
    const firebaseDates = snapshot.docs.map(doc => doc.data().date);
    const allDates = Array.from(new Set([...airbnbDates, ...firebaseDates]));
    */

    return NextResponse.json({ success: true, dates: airbnbDates });
    
  } catch (error) {
    console.error("Error general en API blocked-dates:", error);
    return NextResponse.json(
      { success: false, error: "Error interno al cargar fechas" }, 
      { status: 500 }
    );
  }
}

/**
 * MÉTODO POST (Bloqueo manual - Se mantiene por si acaso, pero GET lo ignorará)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date } = body;
    if (!date) return NextResponse.json({ error: "Falta fecha" }, { status: 400 });

    const blockedDatesRef = collection(db, COLLECTION_NAME);
    const q = query(blockedDatesRef, where("date", "==", date));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) return NextResponse.json({ message: "Ya bloqueada" }, { status: 200 });

    await addDoc(blockedDatesRef, { date, createdAt: new Date().toISOString(), source: 'manual' });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

/**
 * MÉTODO DELETE (Desbloqueo manual)
 */
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { date } = body;
    if (!date) return NextResponse.json({ error: "Falta fecha" }, { status: 400 });

    const blockedDatesRef = collection(db, COLLECTION_NAME);
    const q = query(blockedDatesRef, where("date", "==", date));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return NextResponse.json({ message: "No encontrada en manual" }, { status: 404 });

    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}