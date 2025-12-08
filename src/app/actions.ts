"use server";

import { Resend } from "resend";
import { headers } from "next/headers";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingEmail(formData: FormData) {
  try {
    console.log("--- Iniciando envío de formulario ---");

    // 1. VALIDACIÓN DE SEGURIDAD
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ ERROR: Falta RESEND_API_KEY en variables de entorno");
      return { success: false, error: "Error de configuración del servidor." };
    }

    // 2. OBTENER IP (Anti-Spam)
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";

    // 3. RATE LIMITING (1 solicitud cada 24 horas por IP)
    const rateLimitsRef = collection(db, "rate_limits");
    const q = query(rateLimitsRef, where("ip", "==", ip));
    const snapshot = await getDocs(q);

    const yesterday = new Date();
    yesterday.setHours(yesterday.getHours() - 24);

    const hasRecentRequest = snapshot.docs.some(doc => {
      const data = doc.data();
      const createdAt = data.created_at?.toDate ? data.created_at.toDate() : new Date(data.created_at);
      return createdAt > yesterday;
    });

    if (hasRecentRequest) {
      console.warn("⛔ Bloqueado por Rate Limit:", ip);
      return { success: false, error: "Solo puedes enviar una solicitud por día para evitar spam." };
    }

    // 4. DATOS DEL FORMULARIO
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const date = formData.get("date") as string;
    const honeypot = formData.get("website"); 

    if (honeypot) return { success: false, error: "Error de validación." }; // Bot detectado
    
    if (!name || !email || !phone || !date) {
      return { success: false, error: "Por favor completa todos los campos obligatorios." };
    }

    // 5. GUARDAR INTENTO
    await addDoc(rateLimitsRef, {
      ip,
      email,
      created_at: Timestamp.now()
    });

    // 6. ENVIAR CORREO AL CLIENTE REAL
    // IMPORTANTE: El 'from' debe ser una dirección de tu dominio (ej: reservas@casonaculipran.cl)
    // El 'to' es el correo de tu cliente (Gmail).
    // El 'replyTo' es el correo de la persona que llenó el formulario.
    
    const clientEmail = "reservascasonaculipran@gmail.com"; 
    const senderEmail = "reservas@casonaculipran.cl"; 

    console.log(`Enviando correo a ${clientEmail} para fecha ${date}`);
    
    const { data, error } = await resend.emails.send({
      from: `Casona Culiprán <${senderEmail}>`, 
      to: [clientEmail], 
      replyTo: email, 
      subject: `NUEVA SOLICITUD: Reserva para el ${date}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; border: 1px solid #e5e5e5; padding: 30px; border-radius: 12px;">
          <h2 style="color: #151515; margin-top: 0; border-bottom: 2px solid #2BE2BF; padding-bottom: 10px;">
            ¡Tienes una nueva solicitud!
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 10px;"><strong>📅 Fecha:</strong> ${date}</li>
              <li style="margin-bottom: 10px;"><strong>👤 Cliente:</strong> ${name}</li>
              <li style="margin-bottom: 10px;"><strong>📞 Teléfono:</strong> <a href="tel:${phone}" style="color: #2BE2BF; text-decoration: none;">${phone}</a></li>
              <li style="margin-bottom: 0;"><strong>✉️ Email:</strong> <a href="mailto:${email}" style="color: #2BE2BF; text-decoration: none;">${email}</a></li>
            </ul>
          </div>
          
          <p><strong>Mensaje del cliente:</strong></p>
          <div style="background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 6px; white-space: pre-wrap; color: #555;">
            ${message || "Sin mensaje adicional"}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Error Resend:", error);
      return { success: false, error: "Error enviando correo. Intenta nuevamente." };
    }

    return { success: true, message: "Correo enviado exitosamente" };

  } catch (err: any) {
    console.error("❌ Error CRÍTICO:", err);
    return { success: false, error: "Error interno del sistema." };
  }
}