import { db } from '../../database/db';
import { EspecialistaCrearProps, EspecialistaEditarProps, EspecialistaProps, EspecialistaResponseProps } from '../../types/especialista';
import { UUID } from '../../types/types';
import { generarIdUnico } from '../../utils/generador';

export class ModeloEspecialista {
    static async getAll() {
        const connection = await db.getConnection();
        try {
            const [resultDataEspecialistas] = await connection.query(`SELECT e.id,e.nombre,e.apellido,e.email,e.telefono,e.direccion,e.avatar,e.linkedin,e.servicio,s.titulo AS servicio FROM especialistas e JOIN serviciosdentales s ON e.servicio = s.id ORDER BY e.nombre, e.apellido ASC;`);

            if (!resultDataEspecialistas) throw new Error('Error obteniendo especialistas');

            return { success: true, message: "Especialistas obtenidos correctamente", especialistas: resultDataEspecialistas };
        } catch (error) {
            return { success: false, message: error || "Error al obtener los especialistas", especialistas: {} };
        } finally {
            connection.release();
        }
    }


    static async createEspecialista({ dataEspecialista }: { dataEspecialista: EspecialistaProps }) {
        const connection = await db.getConnection();

        try {
            const id = generarIdUnico();

            const { nombre, apellido, email, telefono, direccion, avatar, linkedin, servicio } = dataEspecialista;

            const [resultCrearEspecialista] = await connection.query(
                `INSERT INTO especialistas (id, nombre, apellido, email, telefono, direccion, avatar, linkedin, servicio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,   // puedes agregar más en el futuro
                [id, nombre, apellido, email, telefono, direccion, avatar, linkedin, servicio]
            );

            if (!resultCrearEspecialista) throw new Error('Error al crear el especialista');

            const [resultEspecialistaCreado] = await connection.query<EspecialistaResponseProps[]>(`SELECT E.id,E.nombre,E.apellido,E.email,E.telefono,E.direccion,E.avatar,E.linkedin,S.titulo AS servicio FROM especialistas E LEFT JOIN serviciosdentales S ON E.servicio = S.id WHERE E.id = ?`, [id]);

            if (!resultEspecialistaCreado) throw new Error('Error al obtener el especialista creado');

            const especialistaCreado = resultEspecialistaCreado[0];

            return { success: true, message: 'Especialista creado correctamente', especialista: especialistaCreado };
        } catch (error) {
            return { success: false, message: error || 'Error al crear el especialista', especialista: {} };
        } finally {
            connection.release();
        }
    }



    static async updateEspecialista({ id, dataEspecialista }: { id: UUID, dataEspecialista: Partial<EspecialistaCrearProps> }) {
        const connection = await db.getConnection();

        try {

            const allowedFields = ['nombre', 'apellido', 'email', 'telefono', 'direccion', 'avatar', 'linkedin', 'servicio'];

            const fields: string[] = [];
            const values: string[] = [];

            for (const key of Object.keys(dataEspecialista) as (keyof EspecialistaEditarProps)[]) {
                if (allowedFields.includes(key as keyof EspecialistaEditarProps) && dataEspecialista[key] !== undefined) {
                    fields.push(`${key} = ?`);
                    values.push(dataEspecialista[key] as EspecialistaEditarProps[keyof EspecialistaEditarProps]);
                }
            }

            if (fields.length === 0) {
                return { success: false, message: 'No se proporcionaron campos para actualiar', especialista: {} };
            }

            values.push(id);

            const query = `UPDATE especialistas SET ${fields.join(', ')} WHERE id = ?`;

            const [resultEditarEspecialista] = await connection.query(query, values);

            if (!resultEditarEspecialista) throw new Error('Error al editar el especialista');

            const [resultEspecialistaEditado] = await connection.query<EspecialistaResponseProps[]>(`SELECT E.id,E.nombre,E.apellido,E.email,E.telefono,E.direccion,E.avatar,E.linkedin,S.titulo AS servicio, S.id AS id_servicio FROM especialistas E LEFT JOIN serviciosdentales S ON E.servicio = S.id WHERE E.id = ?`, [id]);

            console.log("entro", resultEspecialistaEditado)
            if (!resultEspecialistaEditado) throw new Error('Error al obtener el especialista editado');

            const EspecialistaEditado = resultEspecialistaEditado[0];

            return { success: true, message: 'Especialista editado correctamente', especialista: EspecialistaEditado };

        } catch (error) {
            return { success: false, message: error || 'Error al editar el especialista', especialista: {} };
        } finally {
            connection.release();
        }
    }


    static async deleteEspecialista({ id }: { id: UUID }) {
        const connection = await db.getConnection();

        try {
            const [resultEliminarEspecialista] = await connection.query(`DELETE FROM especialistas WHERE id = ?`, [id]);
            if (!resultEliminarEspecialista) throw new Error('Error al eliminar el especialista');

            return { success: true, message: 'Especialista eliminado correctamente', especialista: { id } };

        } catch (error) {
            return { success: false, message: error || 'Error al eliminar el especialista', especialista: {} };
        } finally {
            connection.release();
        }
    }


}