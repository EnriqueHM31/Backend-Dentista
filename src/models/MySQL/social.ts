import { db } from '../../database/db';
import { SocialResponseProps } from '../../types/social';
import { UUID } from '../../types/types';
import { generarIdUnico } from '../../utils/generador';

export class ModeloSocial {
    static async getAll() {
        const connection = await db.getConnection();
        try {
            const [resultRedesSociales] = await connection.query('SELECT id, nombre, referencia FROM sociales');

            if (!resultRedesSociales) throw new Error('Error obteniendo redes sociales');

            return { success: true, message: "Sociales obtenidos correctamente", redesSociales: resultRedesSociales };
        } catch (error) {
            return { success: false, message: error || "Error al obtener las redes sociales", redesSociales: {} };
        } finally {
            connection.release();
        }
    }

    static async createSocial({ referencia }: { referencia: string }) {
        const connection = await db.getConnection();

        try {

            const id = generarIdUnico();
            const [resulCrearRedSocial] = await connection.query('INSERT INTO sociales (id, referencia) VALUES (?, ?)', [id, referencia]);

            if (!resulCrearRedSocial) throw new Error('Error al crear la red social');

            return { success: true, message: "Red social creada correctamente", redSocial: resulCrearRedSocial };
        } catch (error) {
            return { success: false, message: error || "Error al crear la red social", redSocial: {} };
        } finally {
            connection.release();
        }
    }

    static async deleteSocial({ id }: { id: UUID }) {
        const connection = await db.getConnection();

        try {
            const [resultadoEliminarRedSocial] = await connection.query('DELETE FROM sociales WHERE id = ?', [id]);

            if (!resultadoEliminarRedSocial) throw new Error('Error al eliminar la red social');

            return { success: true, message: "Red social eliminada correctamente", redSocial: { id } };

        } catch (error) {
            return { success: false, message: error || "Error al eliminar la red social", redSocial: {} };
        } finally {
            connection.release();
        }
    }

    static async updateSocial({ id, referencia }: { id: UUID, referencia: string }) {
        const connection = await db.getConnection();

        try {
            const [resultadoModificarRedSocial] = await connection.query('UPDATE sociales SET referencia = ? WHERE id = ?', [referencia, id]);

            if (!resultadoModificarRedSocial) throw new Error('Error al modificar la red social');

            const [resultadoRedSocialObtenida] = await connection.query<SocialResponseProps[]>('SELECT id, referencia FROM Sociales WHERE id = ?', [id]);

            if (!resultadoRedSocialObtenida) throw new Error('Error al obtener la red social modificada');

            const SocialEditar = resultadoRedSocialObtenida[0];

            return { success: true, message: "Red social actualizada correctamente", redSocial: SocialEditar };
        } catch (error) {
            return { success: false, message: error || 'Error al actualizar la red social', redSocial: {} };
        } finally {
            connection.release();
        }
    }
}