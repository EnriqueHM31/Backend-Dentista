export function formatearFechaLarga(fecha: Date): string {
    return fecha.toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export function formatearHoraLegible(hora: string): string {
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