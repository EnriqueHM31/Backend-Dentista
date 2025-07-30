import { DESTINATARIO, REMITENTE } from "../config";
import { CitaProps } from "../types/citas";
import { ComentarioEnviarMensajeProps } from "../types/comentario";
import { formatearFechaLarga, formatearHoraLegible } from "./Hora";

export const MensajeCorreo = ({ nombre, ranking, email, servicio, mensaje }: ComentarioEnviarMensajeProps) => {
    return {
        from: REMITENTE,
        to: DESTINATARIO,
        subject: 'Nuevo mensaje desde Odontología LEHM',
        text: mensaje,
        html: `
        <div style="background-color: rgb(2, 19, 49); color: #ffffff; font-family: Arial, sans-serif; padding: 24px; border-radius: 10px; max-width: 600px; margin: auto;">
        <h1 style="font-size: 24px; margin: 0; text-align: center;">Nuevo mensaje desde Odontología LEHM</h1>
        
        <p style="font-size: 16px; margin: 10px 0;">
        <strong>Nombre:</strong> ${nombre}
        </p>
        
        <p style="font-size: 16px; margin: 10px 0;">
        <strong>Correo electrónico:</strong> <a href="mailto:${email}" style="color: #4da6ff; text-decoration: none;">${email}</a>
        </p>
        
        <p style="font-size: 16px; margin: 10px 0;">
        <strong>Comentario sobre:</strong> ${servicio}
        </p>
        
        <p style="font-size: 16px; margin: 10px 0;">
        <strong>Puntuacion:</strong> ${ranking} estrellas
        </p>

        <div style="background-color: rgb(0, 12, 37); padding: 16px; border-left: 4px solid #ffffff88; border-radius: 8px; margin-top: 20px;">
        <p style="font-size: 16px; margin: 0;"><strong>Mensaje:</strong></p>
        <p style="margin-top: 8px;">${mensaje}</p>
        </div>
    </div>
    `
    };

}

export const MensajeCorreoAceptarSolicitud = ({
    nombre,
    email,
    comentarios,
    telefono,
    servicio,
    fecha,
    hora,
}: CitaProps) => {


    return {
        from: REMITENTE,
        to: email,
        subject: 'Confirmación de tu cita en Odontología LEHM',
        text: `Hola ${nombre}, tu cita para el servicio de ${servicio} ha sido aceptada. Te esperamos el ${formatearFechaLarga(new Date(fecha))}.`,
        html: `
        <div style="background-color: #021331; color: #ffffff; font-family: Arial, sans-serif; padding: 24px; border-radius: 12px; max-width: 600px; margin: auto;">
        <h2 style="text-align: center; font-size: 22px; margin-bottom: 24px;">🎉 ¡Tu cita ha sido aceptada!</h2>

        <p style="font-size: 16px; margin-bottom: 8px;">Hola <strong>${nombre}</strong>,</p>
        <p style="font-size: 16px; margin-bottom: 16px;">
            Te confirmamos que tu cita ha sido <strong>aceptada</strong> en <strong>Odontología LEHM</strong>. A continuación, te compartimos los detalles:
        </p>

        <div style="background-color: #00142f; padding: 16px; border-left: 4px solid #4da6ff; border-radius: 8px;">
            <p><strong>🦷 Servicio:</strong> ${servicio}</p>
            <p><strong>📅 Fecha:</strong> ${formatearFechaLarga(new Date(fecha))}</p>
            <p><strong>🕒 Hora:</strong> ${formatearHoraLegible(hora)}</p>
            <p><strong>📞 Teléfono:</strong> ${telefono}</p>
            ${comentarios
                ? `<p><strong>💬 Comentarios:</strong> ${comentarios}</p>`
                : ""
            }
        </div>

        <p style="margin-top: 24px; font-size: 15px;">
            Si tienes alguna duda o necesitas reprogramar tu cita, no dudes en contactarnos respondiendo a este correo.
        </p>

        <p style="margin-top: 24px; text-align: center; font-size: 14px; color: #aaaaaa;">
            © ${new Date().getFullYear()} Odontología LEHM · Todos los derechos reservados
        </p>
      </div>
    `,
    };
};
