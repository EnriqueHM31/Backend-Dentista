import { db } from '../../database/db';
import { PreguntaCrearProps, PreguntaCrearResponseProps } from '../../types/pregunta';
import { UUID } from '../../types/types';
import { generarIdUnico } from '../../utils/generador';
export class ModeloPreguntas {
    static async getAll() {
        try {
            const [resultPreguntas] = await db.query('SELECT id, pregunta, respuesta FROM preguntas ORDER BY pregunta ASC');

            if (!resultPreguntas) throw new Error('Error obteniendo preguntas');

            return { success: true, message: "Preguntas obtenidas correctamente", preguntas: resultPreguntas };
        } catch (error) {
            return { success: false, message: error || "Error al obtener las preguntas", preguntas: {} };
        }
    }

    static async createPregunta({ pregunta, respuesta }: PreguntaCrearProps) {
        try {
            const id = generarIdUnico();
            const [resultInsertarPregunta] = await db.query('INSERT INTO preguntas (id, pregunta, respuesta) VALUES (?, ?, ?)', [id, pregunta, respuesta]);

            if (!resultInsertarPregunta) throw new Error('Error al crear la pregunta');

            const [resultPreguntaCreada] = await db.query<PreguntaCrearResponseProps[]>('SELECT * FROM preguntas WHERE id = ?', [id]);

            if (!resultPreguntaCreada) throw new Error('Error al obtener la pregunta creada');

            const PreguntaCreada = resultPreguntaCreada[0];

            return { success: true, message: "Pregunta creada correctamente", pregunta: PreguntaCreada };
        } catch (error) {
            return { success: false, message: error || "Error al crear la pregunta", pregunta: {} };
        }
    }


    static async updatePregunta({ id, camposPregunta }: { id: UUID, camposPregunta: Partial<PreguntaCrearProps> }) {
        try {

            const allowedFields = ['pregunta', 'respuesta']; // Campos permitidos
            const fields: string[] = [];
            const values: string[] = [];

            for (const key of Object.keys(camposPregunta) as (keyof PreguntaCrearProps)[]) {
                if (allowedFields.includes(key) && camposPregunta[key] !== undefined) {
                    fields.push(`${key} = ?`);
                    values.push(camposPregunta[key] as string);
                }
            }

            if (fields.length === 0) {
                return { success: false, message: 'No se proporcionaron campos válidos para actualizar', pregunta: {} };
            }

            values.push(id);

            const query = `UPDATE preguntas SET ${fields.join(', ')} WHERE id = ?`;

            const [ResultModificarPregunta] = await db.query(query, values);

            if (!ResultModificarPregunta) throw new Error('Error al modificar la pregunta');

            const [ResultPreguntaModificada] = await db.query<PreguntaCrearResponseProps[]>('SELECT * FROM preguntas WHERE id = ?', [id]);
            if (!ResultPreguntaModificada) throw new Error('Error al obtener la pregunta modificada');

            const PreguntaModificada = ResultPreguntaModificada[0];

            return { success: true, message: "Pregunta actualizada correctamente", pregunta: PreguntaModificada };
        } catch (error) {
            return { success: false, message: error || 'Error al actualizar la pregunta', pregunta: {} };
        }
    }


    static async deletePregunta({ id }: { id: UUID }) {
        try {
            const [resultEliminarPregunta] = await db.query('DELETE FROM preguntas WHERE id = ?', [id]);

            if (!resultEliminarPregunta) throw new Error('Error al eliminar la pregunta');

            return { success: true, message: "Pregunta eliminada correctamente", pregunta: { id } };
        } catch (error) {
            return { success: false, message: error || 'Error al eliminar la pregunta', pregunta: {} };
        }
    }
}