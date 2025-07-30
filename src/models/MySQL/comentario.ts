import { transporter } from '../../utils/contacto';
import { db } from '../../database/db';
import { ComentarioEditarProps, ComentarioEditarResponseProps, ComentarioEnviarMensajeProps, ComentarioResponseProps } from '../../types/comentario';
import { MensajeCorreo } from '../../utils/mensaje';
import { generarIdUnico } from '../../utils/generador';
import { UUID } from '../../types/types';


export class ModeloContacto {

    static async getComentarios() {
        try {
            const [Comentarios] = await db.query('SELECT * FROM comentarios');

            if (!Comentarios) throw new Error('Error obteniendo comentarios');
            return { success: true, message: "Comentarios obtenidos correctamente", comentarios: Comentarios };
        } catch (error) {
            return { success: false, message: error || 'Error con obtener comentarios', comentarios: {} };
        }
    }

    static async getComentariosVisibles() {
        try {
            const [ComentariosVisibles] = await db.query('SELECT * FROM comentarios WHERE visible = 1');

            if (!ComentariosVisibles) throw new Error('Error obteniendo comentarios visibles');

            return { success: true, message: "Comentarios obtenidos correctamente", comentarios: ComentariosVisibles };
        } catch (error) {
            return { success: false, message: error || 'Error con obtener comentarios visibles', comentarios: {} };
        }
    }

    static async EnviarMensaje({ nombre, ranking, email, servicio, mensaje }: ComentarioEnviarMensajeProps) {

        const mailOptions = MensajeCorreo({ nombre, ranking, email, servicio, mensaje });
        try {
            const info = await transporter.sendMail(mailOptions);

            if (!info.accepted) throw new Error('Error enviando el mensaje');

            const id = generarIdUnico()

            const [resultInsertarComentario] = await db.query('INSERT INTO comentarios (id, nombre, ranking, email, servicio, mensaje, visible) VALUES (?, ?, ?, ?, ?, ?, ?)', [id, nombre, ranking, email, servicio, mensaje, true]);

            if (!resultInsertarComentario) throw new Error('Error al guardar el mensaje');

            const [Comentario] = await db.query<ComentarioResponseProps[]>(`SELECT * FROM comentarios WHERE id = ?`, [id]);

            if (!Comentario) throw new Error('Error al obtener el mensaje');

            const ComentarioGuardado = Comentario[0];

            return { success: true, message: 'Comentario enviado correctamente', comentario: ComentarioGuardado }
        }
        catch (error) {
            return { success: false, message: error || 'Error enviando el mensaje', comentario: {} };
        }
    }

    static async updateComentario({ id, visible }: ComentarioEditarProps) {
        try {
            const [resultModificarComentario] = await db.query('UPDATE comentarios SET visible = ? WHERE id = ?', [visible, id]);

            if (!resultModificarComentario) throw new Error('Error al modificar el comentario');

            const [resultComentarioModificado] = await db.query<ComentarioEditarResponseProps[]>('SELECT id, visible FROM Comentarios WHERE id = ?', [id]);

            if (!resultComentarioModificado) throw new Error('Error al obtener el comentario modificado');

            const ComentarioModificado = resultComentarioModificado[0];

            return { success: true, message: "Comentario actualizado correctamente", comentario: ComentarioModificado };

        } catch (error) {
            return { success: false, message: error || 'Error al actualizar el comentario', comentario: {} };
        }
    }


    static async deleteComentario({ id }: { id: UUID }) {
        try {
            const [resultEliminarComentario] = await db.query('DELETE FROM comentarios WHERE id = ?', [id]);

            if (!resultEliminarComentario) throw new Error('Error al eliminar el comentario');

            return { success: true, message: "Se elimino el comentario", comentario: { id } };

        } catch (error) {
            return { success: false, message: error || 'Error al eliminar el comentario', comentario: {} };
        }
    }
}