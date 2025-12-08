"use client";

import { useState, useEffect } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isBefore, 
  startOfToday 
} from "date-fns";
import { es } from "date-fns/locale";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaArrowLeft, FaPaperPlane, FaCheckCircle, FaLock } from "react-icons/fa";
import Image from "next/image"; 
import { sendBookingEmail } from "@/app/actions"; 

export default function BookingWidget() {
  const [currentMonth, setCurrentMonth] = useState(startOfToday());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<"calendar" | "form" | "success">("calendar");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [isLoadingDates, setIsLoadingDates] = useState(true);

  const today = startOfToday();
  const firstDayCurrentMonth = startOfMonth(currentMonth);
  const isCurrentMonth = isSameMonth(currentMonth, today);

  // 1. CARGAR FECHAS
  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        const response = await fetch('/api/blocked-dates');
        const data = await response.json();
        if (data.success) {
          setBlockedDates(data.dates); 
        }
      } catch (error) {
        console.error("Error cargando fechas:", error);
      } finally {
        setIsLoadingDates(false);
      }
    };
    fetchBlockedDates();
  }, []);

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  
  const prevMonth = () => {
    if (!isCurrentMonth) {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

  const isBlocked = (day: Date) => {
    if (isBefore(day, today)) return true;
    const dateString = format(day, "yyyy-MM-dd");
    return blockedDates.includes(dateString);
  };

  const isPastDate = (day: Date) => isBefore(day, today);

  const handleDateClick = (day: Date) => {
    // Evitar click en días bloqueados o fuera del mes visible si quisieras restringirlo
    if (isBlocked(day)) return;
    
    // Opcional: Si quieres que al hacer click en un dia gris te lleve a ese mes:
    // if (!isSameMonth(day, currentMonth)) { setCurrentMonth(day); }
    
    setSelectedDate(day);
    setView("form");
    setErrorMessage("");
  };

  // 2. ENVÍO REAL DEL FORMULARIO
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    if (selectedDate) {
      formData.append("date", format(selectedDate, "dd/MM/yyyy"));
    }

    // Llamada al Servidor (Action)
    const result = await sendBookingEmail(formData);

    setIsSending(false);

    if (result.success) {
      setView("success");
    } else {
      // Mostramos el error (ej: límite de IP o fallo de red)
      setErrorMessage(result.error?.toString() || "Ocurrió un error.");
    }
  };

  // --- VISTA 1: CALENDARIO ---
  if (view === "calendar") {
    return (
      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-200 max-w-4xl mx-auto transition-all duration-500">
        
        <div className="bg-dark text-white p-8 flex justify-between items-center">
          <div>
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">Selecciona fecha</p>
            <h3 className="font-bold text-3xl capitalize">
              {format(currentMonth, "MMMM yyyy", { locale: es })}
            </h3>
          </div>
          <div className="flex gap-3">
            <button 
                onClick={prevMonth} 
                disabled={isCurrentMonth} 
                className={`p-3 rounded-full transition border flex items-center justify-center ${isCurrentMonth ? "border-white/10 text-gray-600 cursor-not-allowed opacity-30" : "border-white/20 text-white hover:bg-white/20"}`}
            >
                <FaChevronLeft />
            </button>
            <button onClick={nextMonth} className="p-3 hover:bg-white/20 rounded-full transition text-white border border-white/20"><FaChevronRight /></button>
          </div>
        </div>

        <div className="p-6 md:p-10">
          {isLoadingDates && <div className="text-center py-4 text-gray-400 text-xs uppercase tracking-widest animate-pulse">Cargando disponibilidad...</div>}
          
          <div className="grid grid-cols-7 mb-6 text-center border-b border-gray-100 pb-4">
            {["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"].map((day) => <span key={day} className="text-sm font-bold text-gray-400 uppercase tracking-wider">{day}</span>)}
          </div>

          <div className="grid grid-cols-7 gap-3 md:gap-4">
            {!isLoadingDates && days.map((day) => {
              const blocked = isBlocked(day);
              const isPast = isPastDate(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isCurrentMonthVisible = isSameMonth(day, currentMonth);
              const isReserved = blocked && !isPast;

              return (
                <button
                  key={day.toString()}
                  // Deshabilitamos click si no es del mes visible para evitar confusiones, o lo dejamos habilitado según preferencia
                  onClick={() => isCurrentMonthVisible && handleDateClick(day)}
                  disabled={blocked || (!isCurrentMonthVisible)} 
                  className={`
                    h-12 w-12 md:h-16 md:w-16 rounded-2xl flex flex-col items-center justify-center text-base transition-all duration-200 relative mx-auto
                    ${
                      !isCurrentMonthVisible 
                        ? "text-gray-200 bg-transparent cursor-default border-none" // CAMBIO CLAVE: Estilo limpio para días de otros meses
                        : isPast 
                          ? "text-gray-300 bg-gray-50 cursor-not-allowed opacity-50 border-2 border-transparent" 
                        : isReserved 
                          ? "bg-red-50 text-red-400 cursor-not-allowed border-2 border-red-200 opacity-80" 
                        : isSelected 
                          ? "bg-dark text-white font-bold shadow-lg scale-110 border-2 border-dark" 
                        : "bg-white text-dark font-bold border-2 border-primary hover:bg-primary hover:scale-105 group"
                    }
                  `}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
                  
                  {/* Badge RESERVADA solo en mes actual */}
                  {isReserved && isCurrentMonthVisible && (
                    <div className="flex flex-col items-center mt-[-2px]">
                      <span className="text-[0.5rem] md:text-[0.6rem] uppercase font-black text-red-400 leading-none hidden md:block">Reservada</span>
                      <FaLock className="w-2 h-2 md:w-3 md:h-3 text-red-300 mt-[1px]" />
                    </div>
                  )}

                  {/* Badge LIBRE solo en mes actual */}
                  {!blocked && isCurrentMonthVisible && !isSelected && (
                    <span className="text-[0.6rem] uppercase font-black text-[#b3a786] mt-[-2px] hidden md:block group-hover:text-dark transition-colors">Libre</span>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm border-t border-gray-100 pt-6">
            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded border-2 border-primary bg-white"></span><span className="text-gray-600 font-medium">Disponible</span></div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-dark"></span><span className="text-gray-600 font-medium">Tu Selección</span></div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-red-50 border border-red-200 flex items-center justify-center text-[0.6rem] text-red-400"><FaLock /></span><span className="text-gray-400">Reservada</span></div>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA 3: ÉXITO ---
  if (view === "success") {
    return (
      <div className="bg-white rounded-[2rem] shadow-2xl border border-green-100 max-w-4xl mx-auto p-16 text-center animate-in zoom-in duration-300">
        <div className="flex justify-center mb-6">
            <Image 
              src="/images/fotos/logo.png" 
              alt="Casona Culiprán" 
              width={120} 
              height={120} 
              className="object-contain mix-blend-multiply"
            />
        </div>
        <h2 className="text-4xl font-bold text-dark mb-4">¡Mensaje Recibido!</h2>
        <p className="text-gray-600 text-xl max-w-lg mx-auto mb-10 leading-relaxed">
          Gracias por escribirnos. Pronto estaremos en contacto contigo para coordinar tu visita.
        </p>
        <button onClick={() => { setSelectedDate(null); setView("calendar"); }} className="bg-primary text-dark font-bold py-4 px-10 rounded-full hover:brightness-105 transition shadow-lg text-lg">Volver al Calendario</button>
      </div>
    );
  }

  // --- VISTA 2: FORMULARIO ---
  return (
    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-200 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-primary text-dark p-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-white/30 p-3 rounded-full"><FaCalendarAlt className="text-dark text-xl" /></div>
          <div><p className="text-dark/70 text-xs font-bold uppercase tracking-widest">Estás solicitando el</p><p className="font-black text-2xl capitalize">{selectedDate && format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}</p></div>
        </div>
        <button onClick={() => setView("calendar")} className="text-sm font-bold flex items-center gap-2 bg-white/20 hover:bg-white/40 px-4 py-2 rounded-full transition"><FaArrowLeft /> Volver</button>
      </div>
      <div className="p-8 md:p-12">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* HONEYPOT ANTI-ROBOTS */}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2"><label className="text-sm font-extrabold text-dark uppercase tracking-wider ml-1">Nombre Completo</label><input name="name" type="text" required placeholder="Ej: Juan Pérez" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-dark font-medium focus:outline-none focus:border-primary focus:bg-white transition" /></div>
            <div className="space-y-2"><label className="text-sm font-extrabold text-dark uppercase tracking-wider ml-1">Teléfono</label><input name="phone" type="tel" required placeholder="+56 9 ..." className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-dark font-medium focus:outline-none focus:border-primary focus:bg-white transition" /></div>
          </div>
          <div className="space-y-2"><label className="text-sm font-extrabold text-dark uppercase tracking-wider ml-1">Correo Electrónico</label><input name="email" type="email" required placeholder="tu@correo.com" className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-dark font-medium focus:outline-none focus:border-primary focus:bg-white transition" /></div>
          <div className="space-y-2"><label className="text-sm font-extrabold text-dark uppercase tracking-wider ml-1">Mensaje (Opcional)</label><textarea name="message" rows={3} placeholder="Cuéntanos brevemente sobre tu evento..." className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-5 py-4 text-dark font-medium focus:outline-none focus:border-primary focus:bg-white transition resize-none"></textarea></div>
          
          {errorMessage && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-bold border border-red-200 animate-pulse">
                {errorMessage}
            </div>
          )}

          <div className="pt-6 flex flex-col md:flex-row gap-4 items-center justify-between border-t border-gray-100 mt-6">
            <button type="button" onClick={() => setView("calendar")} className="text-gray-400 font-bold hover:text-dark transition text-sm px-4">Cancelar</button>
            <button type="submit" disabled={isSending} className="w-full md:w-auto bg-dark text-white font-bold py-4 px-10 rounded-full hover:bg-gray-800 transition shadow-xl flex items-center justify-center gap-3 text-lg transform hover:-translate-y-1 disabled:opacity-50">{isSending ? "Enviando..." : <><FaPaperPlane /> Enviar Solicitud</>}</button>
          </div>
        </form>
      </div>
    </div>
  );
}