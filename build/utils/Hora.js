"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatearFechaLarga = formatearFechaLarga;
exports.formatearHoraLegible = formatearHoraLegible;
function formatearFechaLarga(fecha) {
    return fecha.toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}
function formatearHoraLegible(hora) {
    const [horas, minutos, segundos] = hora.split(":").map(Number);
    const fecha = new Date();
    fecha.setHours(horas);
    fecha.setMinutes(minutos);
    fecha.setSeconds(segundos || 0);
    return fecha.toLocaleTimeString("es-MX", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}
