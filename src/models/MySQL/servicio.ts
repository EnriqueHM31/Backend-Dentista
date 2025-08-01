import { db } from '../../database/db';
import { ServicioCrearProps, ServicioEditarProps, ServicioResponseProps } from '../../types/servicio';
import { UUID } from '../../types/types';
import { generarIdUnico } from '../../utils/generador';

export class ModeloServicio {

    static async crearServicio({ titulo, descripcion, img, duration }: ServicioCrearProps) {
        const connection = await db.getConnection();
        try {
            const id = generarIdUnico();

            const [resultCrearServicio] = await connection.query(`INSERT INTO serviciosdentales (id, titulo, descripcion, img, duration) VALUES (?, ?, ?, ?, 30)`, [id, titulo, descripcion, img, duration]);

            if (!resultCrearServicio) throw new Error("No se pudo crear el servicio");

            const [resultServicioCreado] = await connection.query<ServicioResponseProps[]>(`SELECT * FROM serviciosdentales WHERE id = ?`, [id]);

            if (!resultServicioCreado) throw new Error("No se pudo obtener el servicio creado");

            const ServicioCreado = resultServicioCreado[0];

            return { success: true, message: 'Servicio creado correctamente', servicio: ServicioCreado };
        } catch (error) {
            return { success: false, message: error || 'Error al crear el servicio', servicio: {} };
        } finally {
            connection.release();
        }
    }

    static async getServicios() {
        const connection = await db.getConnection();
        try {
            const [resultDataServicioss] = await connection.query(`SELECT id, titulo, descripcion, img, duration FROM serviciosdentales ORDER BY titulo ASC`);

            if (!resultDataServicioss) throw new Error("No se pudo obtener los servicios");

            return { success: true, message: "Servicios obtenidos correctamente", servicios: resultDataServicioss };
        } catch (error) {
            return { success: false, message: 'Error en la base de datos', servicios: [] };
        } finally {
            connection.release();
        }
    }

    static async getDisponibles() {
        const connection = await db.getConnection();

        try {
            const [resultDataServiciosDisponibles] = await connection.query(`SELECT s.id,s.titulo,s.descripcion,s.img,s.duration FROM serviciosdentales s LEFT JOIN especialistas e ON s.id = e.servicio WHERE e.servicio IS NULL;`);

            if (!resultDataServiciosDisponibles) throw new Error("No se pudo obtener los servicios disponibles");

            return { success: true, message: "Servicios disponibles correctamente", serviciosDisponibles: resultDataServiciosDisponibles };
        } catch (error) {
            return { success: false, message: error || "Error al obtener los servicios disponibles", serviciosDisponibles: [] };
        } finally {
            connection.release();
        }
    }


    static async updateServicio({ id, cambiosServicio }: { id: UUID, cambiosServicio: ServicioEditarProps }) {
        const connection = await db.getConnection();

        const allowedFields = ['titulo', 'descripcion', 'img', 'duration']; // Campos permitidos
        const fields: string[] = [];
        const values: string[] = [];

        for (const key of Object.keys(cambiosServicio) as (keyof ServicioEditarProps)[]) {
            if (allowedFields.includes(key as keyof ServicioEditarProps) && cambiosServicio[key] !== undefined) {
                fields.push(`${key} = ?`);
                values.push(cambiosServicio[key] as string);
            }
        }

        if (fields.length === 0) return { success: false, message: 'No se proporcionaron campos válidos para actualizar', cambios: {}, }

        values.push(id); // Agrega el ID al final para el WHERE

        const query = `UPDATE serviciosdentales SET ${fields.join(', ')} WHERE id = ?`;

        try {
            const [resultEditarEspecialista] = await connection.query(query, values);

            if (!resultEditarEspecialista) throw new Error('Error al editar el servicio');

            const [resultServicioEditado] = await connection.query<ServicioResponseProps[]>(`SELECT * FROM serviciosdentales WHERE id = ?`, [id]);

            if (!resultServicioEditado) throw new Error('Error al obtener el servicio editado');

            const ServicioEditado = resultServicioEditado[0];


            return { success: true, message: 'Servicio editado correctamente', servicio: ServicioEditado };

        } catch (error) {
            return { success: false, message: error || 'Error al editar el servicio', servicio: {} };
        } finally {
            connection.release();
        }
    }



    static async deleteServicio({ id }: { id: UUID }) {
        const connection = await db.getConnection();

        try {
            const [resultServicioEliminado] = await connection.query(`DELETE FROM serviciosdentales WHERE id = ?`, [id]);

            if (!resultServicioEliminado) throw new Error('Error al eliminar el servicio');

            return { success: true, message: 'Servicio eliminado correctamente', servicio: { id } };
        } catch (error) {
            return { success: false, message: 'Error al eliminar el servicio', servicio: {} };
        } finally {
            connection.release();
        }
    }


}