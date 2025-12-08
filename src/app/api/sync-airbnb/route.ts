import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import ical from "node-ical";
import { format, eachDayOfInterval, addDays, startOfToday, isBefore, isSameDay } from "date-fns";

const COLLECTION_NAME = "blocked_dates";

// --- LÓGICA CENTRAL DE SINCRONIZACIÓN ---
async function syncAirbnbLogic() {
  const AIRBNB_URL = process.env.AIRBNB_ICAL_URL;

  if (!AIRBNB_URL) {
    throw new Error("Falta configurar AIRBNB_ICAL_URL en .env.local");
  }

  // 1. Descargar y procesar el iCal
  const events = await ical.async.fromURL(AIRBNB_URL);
  const newBlockedDates: string[] = [];
  const today = startOfToday();

  // 2. Procesar eventos
  for (const eventId in events) {
    const event = events[eventId];

    if (event.type === 'VEVENT' && event.start && event.end) {
      const startDate = new Date(event.start);
      // Ajuste: Airbnb marca el checkout como ocupado, restamos 1 día si es necesario
      // Dependiendo de tu lógica de negocio, a veces es mejor bloquear el checkout también si necesitas limpieza.
      // Aquí mantenemos tu lógica de restar 1 día.
      const endDate = addDays(new Date(event.end), -1); 

      if (isBefore(endDate, today)) continue;

      let intervalDates = [];
      if (isSameDay(startDate, endDate) || isBefore(endDate, startDate)) {
          intervalDates = [startDate];
      } else {
          intervalDates = eachDayOfInterval({ start: startDate, end: endDate });
      }

      intervalDates.forEach(date => {
        newBlockedDates.push(format(date, "yyyy-MM-dd"));
      });
    }
  }

  // 3. Obtener fechas existentes en Firebase
  const blockedRef = collection(db, COLLECTION_NAME);
  const snapshot = await getDocs(blockedRef);
  const existingDates = snapshot.docs.map(doc => doc.data().date);

  // 4. Guardar nuevas
  let addedCount = 0;
  for (const dateStr of newBlockedDates) {
    if (!existingDates.includes(dateStr)) {
      await addDoc(blockedRef, {
        date: dateStr,
        source: "airbnb",
        createdAt: new Date().toISOString()
      });
      addedCount++;
    }
  }

  return addedCount;
}

// --- MANEJADORES DE LA API ---

// GET: Para el Cron Job Automático (Vercel lo llama así)
export async function GET() {
  try {
    const addedCount = await syncAirbnbLogic();
    return NextResponse.json({ success: true, message: `Auto-Sync: ${addedCount} fechas agregadas.` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Para el Botón Manual del Admin (Tu cliente lo llama así)
export async function POST() {
  try {
    const addedCount = await syncAirbnbLogic();
    return NextResponse.json({ success: true, message: `Manual-Sync: ${addedCount} fechas agregadas.` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}