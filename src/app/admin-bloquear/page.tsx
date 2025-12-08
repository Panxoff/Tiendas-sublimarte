"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { 
  format, 
  startOfToday, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isBefore,
  addMonths,
  subMonths
} from "date-fns";
import { es } from "date-fns/locale";
import { FaChevronLeft, FaChevronRight, FaLock, FaUnlock, FaSignOutAlt, FaCheckCircle, FaTrash, FaImage } from "react-icons/fa";
import Link from "next/link"; // Importamos Link

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [currentMonth, setCurrentMonth] = useState(startOfToday());
  const [dbBlockedDates, setDbBlockedDates] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState<"block" | "unblock" | null>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoadingAuth(false);
      if (u) fetchBlockedDates();
    });
    return () => unsubscribe();
  }, []);

  const fetchBlockedDates = async () => {
    try {
      const res = await fetch('/api/blocked-dates');
      if (res.ok) {
        const data = await res.json();
        if (data.success) setDbBlockedDates(data.dates);
      }
    } catch (error) { console.error(error); }
  };

  const today = startOfToday();
  const firstDayCurrentMonth = startOfMonth(currentMonth);
  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  });

  const handleDateClick = (day: Date) => {
    if (isBefore(day, today)) return; 

    const dateStr = format(day, "yyyy-MM-dd");
    const isBlocked = dbBlockedDates.includes(dateStr);

    if (!selectionMode) {
      if (isBlocked) {
        setSelectionMode("unblock");
        setSelectedDates([dateStr]);
      } else {
        setSelectionMode("block");
        setSelectedDates([dateStr]);
      }
      return;
    }

    if (selectionMode === "block") {
      if (isBlocked) return;
      if (selectedDates.includes(dateStr)) {
        const newSelection = selectedDates.filter(d => d !== dateStr);
        setSelectedDates(newSelection);
        if (newSelection.length === 0) setSelectionMode(null);
      } else {
        setSelectedDates([...selectedDates, dateStr]);
      }
    } else if (selectionMode === "unblock") {
      if (!isBlocked) return;
      if (selectedDates.includes(dateStr)) {
        const newSelection = selectedDates.filter(d => d !== dateStr);
        setSelectedDates(newSelection);
        if (newSelection.length === 0) setSelectionMode(null);
      } else {
        setSelectedDates([...selectedDates, dateStr]);
      }
    }
  };

  const handleProcessDates = async () => {
    if (selectedDates.length === 0 || !selectionMode) return;
    setIsSaving(true);
    setStatusMessage("Procesando...");

    try {
      const method = selectionMode === "block" ? "POST" : "DELETE";
      
      const promises = selectedDates.map(dateStr => 
        fetch("/api/blocked-dates", {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: dateStr }),
        })
      );

      await Promise.all(promises);

      setStatusMessage(selectionMode === "block" ? "✅ Bloqueado exitosamente" : "✅ Liberado exitosamente");
      await fetchBlockedDates();
      setSelectedDates([]);
      setSelectionMode(null);
      
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error) {
      setStatusMessage("❌ Error al procesar");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await signInWithEmailAndPassword(auth, email, password); } 
    catch { setLoginError("Datos incorrectos"); }
  };

  if (loadingAuth) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Acceso Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-3 rounded" required />
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-3 rounded" required />
            {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
            <button type="submit" className="w-full bg-dark text-white py-3 rounded font-bold hover:bg-black transition">Ingresar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestor de Disponibilidad</h1>
            <p className="text-gray-500 text-sm">
              {!selectionMode && "Toca días libres para bloquear, o rojos para liberar."}
              {selectionMode === 'block' && "Modo: Bloquear fechas (Negro)"}
              {selectionMode === 'unblock' && "Modo: Liberar fechas (Verde)"}
            </p>
          </div>
          
          <div className="flex gap-4">
            {/* BOTÓN NUEVO: IR A GALERÍA */}
            <Link href="/admin-galeria" className="px-4 py-2 bg-primary text-dark rounded-lg text-sm font-bold hover:brightness-105 transition flex items-center gap-2">
                <FaImage /> Galería
            </Link>

            <button onClick={() => signOut(auth)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition" title="Cerrar Sesión">
                <FaSignOutAlt size={20} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-dark text-white p-6 flex justify-between items-center">
            <h2 className="font-bold text-2xl capitalize">{format(currentMonth, "MMMM yyyy", { locale: es })}</h2>
            <div className="flex gap-2">
              <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 hover:bg-white/20 rounded-full"><FaChevronLeft /></button>
              <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 hover:bg-white/20 rounded-full"><FaChevronRight /></button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-7 mb-4 text-center">
              {["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"].map(d => <span key={d} className="text-xs font-bold text-gray-400 uppercase">{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {days.map(day => {
                const dateStr = format(day, "yyyy-MM-dd");
                const isBlocked = dbBlockedDates.includes(dateStr);
                const isSelected = selectedDates.includes(dateStr);
                const isPast = isBefore(day, today);
                const isCurrent = isSameMonth(day, currentMonth);

                let cellClass = "bg-white text-dark hover:border-primary";
                
                if (isPast) {
                    cellClass = "bg-gray-50 text-gray-300 cursor-not-allowed";
                } else if (isSelected) {
                    if (selectionMode === "block") cellClass = "bg-dark text-white scale-105 shadow-lg border-2 border-dark";
                    if (selectionMode === "unblock") cellClass = "bg-green-100 text-green-700 scale-105 shadow-lg border-2 border-green-500";
                } else if (isBlocked) {
                    cellClass = "bg-red-50 text-red-400 cursor-pointer border border-red-100 hover:bg-red-100";
                } else if (selectionMode === "unblock") {
                    cellClass = "bg-white text-gray-300 opacity-50"; 
                } else if (selectionMode === "block") {
                    if (isBlocked) cellClass = "bg-red-50 text-red-200 opacity-50"; 
                }

                return (
                  <button
                    key={day.toString()}
                    onClick={() => handleDateClick(day)}
                    disabled={isPast || (selectionMode === "block" && isBlocked) || (selectionMode === "unblock" && !isBlocked)}
                    className={`
                      h-10 w-10 md:h-14 md:w-14 rounded-xl flex flex-col items-center justify-center text-sm font-bold transition-all duration-200 mx-auto border-2 border-transparent
                      ${cellClass}
                      ${!isCurrent ? "opacity-30" : ""}
                    `}
                  >
                    {format(day, "d")}
                    {isBlocked && !isSelected && <FaLock size={10} className="mt-1 opacity-50" />}
                    {isSelected && selectionMode === "unblock" && <FaUnlock size={10} className="mt-1" />}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-6 flex justify-center gap-6 text-xs text-gray-500 border-t pt-4">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border border-gray-300 rounded"></div> Libre</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-50 border border-red-200 rounded"></div> Ocupado</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-100 border border-green-500 rounded"></div> Liberar</div>
            </div>
          </div>
        </div>

        {selectedDates.length > 0 && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-6 py-4 rounded-full shadow-2xl border border-gray-100 flex items-center gap-4 animate-in slide-in-from-bottom-4 z-50">
            <span className="font-bold text-dark whitespace-nowrap">{selectedDates.length} seleccionados</span>
            
            <button 
              onClick={handleProcessDates}
              disabled={isSaving}
              className={`
                ${selectionMode === 'block' ? 'bg-dark hover:bg-black' : 'bg-green-600 hover:bg-green-700'} 
                text-white font-bold px-6 py-2 rounded-full transition flex items-center gap-2 whitespace-nowrap
              `}
            >
              {isSaving ? "Procesando..." : (
                selectionMode === 'block' 
                  ? <><FaLock /> Confirmar Bloqueo</> 
                  : <><FaUnlock /> Confirmar Liberación</>
              )}
            </button>
            
            <button onClick={() => { setSelectedDates([]); setSelectionMode(null); }} className="text-gray-400 hover:text-red-500 transition">
                <FaTrash />
            </button>
          </div>
        )}

        {statusMessage && (
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-dark text-white px-6 py-3 rounded-lg shadow-lg animate-in fade-in slide-in-from-top-4 z-50">
            {statusMessage}
          </div>
        )}

      </div>
    </div>
  );
}