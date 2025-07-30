import { db } from '../../database/db';
import { SocialResponseProps } from '../../types/social';
import { UUID } from '../../types/types';
import { generarIdUnico } from '../../utils/generador';

export class ModeloSocial {
    static async getAll() {
        try {
            const [resultRedesSociales] = await db.query('SELECT id, nombre, referencia FROM Sociales');

            if (!resultRedesSociales) throw new Error('Error obteniendo redes sociales');

            return { success: true, message: "Sociales obtenidos correctamente", redesSociales: resultRedesSociales };
        } catch (error) {
            return { success: false, message: error || "Error al obtener las redes sociales", redesSociales: {} };
        }
    }

    static async createSocial({ referencia }: { referencia: string }) {
        try {

            const id = generarIdUnico();
            const [resulCrearRedSocial] = await db.query('INSERT INTO Sociales (id, referencia) VALUES (?, ?)', [id, referencia]);

            if (!resulCrearRedSocial) throw new Error('Error al crear la red social');

            return { success: true, message: "Red social creada correctamente", redSocial: resulCrearRedSocial };
        } catch (error) {
            return { success: false, message: error || "Error al crear la red social", redSocial: {} };
        }
    }

    static async deleteSocial({ id }: { id: UUID }) {
        try {
            const [resultadoEliminarRedSocial] = await db.query('DELETE FROM Sociales WHERE id = ?', [id]);

            if (!resultadoEliminarRedSocial) throw new Error('Error al eliminar la red social');

            return { success: true, message: "Red social eliminada correctamente", redSocial: { id } };

        } catch (error) {
            return { success: false, message: error || "Error al eliminar la red social", redSocial: {} };
        }
    }

    static async updateSocial({ id, referencia }: { id: UUID, referencia: string }) {
        try {
            const [resultadoModificarRedSocial] = await db.query('UPDATE Sociales SET referencia = ? WHERE id = ?', [referencia, id]);

            if (!resultadoModificarRedSocial) throw new Error('Error al modificar la red social');

            const [resultadoRedSocialObtenida] = await db.query<SocialResponseProps[]>('SELECT id, referencia FROM Sociales WHERE id = ?', [id]);

            if (!resultadoRedSocialObtenida) throw new Error('Error al obtener la red social modificada');

            const SocialEditar = resultadoRedSocialObtenida[0];

            return { success: true, message: "Red social actualizada correctamente", redSocial: SocialEditar };
        } catch (error) {
            return { success: false, message: error || 'Error al actualizar la red social', redSocial: {} };
        }
    }
}