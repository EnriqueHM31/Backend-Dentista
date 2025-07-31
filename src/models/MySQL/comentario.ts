import { transporter } from '../../utils/contacto';
import { db } from '../../database/db';
import { ComentarioEditarProps, ComentarioEditarResponseProps, ComentarioEnviarMensajeProps, ComentarioResponseProps } from '../../types/comentario';
import { MensajeCorreo } from '../../utils/mensaje';
import { generarIdUnico } from '../../utils/generador';
import { UUID } from '../../types/types';


export class ModeloContacto {
    static async getComentarios() {
        const connection = await db.getConnection();
        try {
            const [Comentarios] = await connection.query('SELECT * FROM comentarios');

            if (!Comentarios) throw new Error('Error obteniendo comentarios');
            return { success: true, message: "Comentarios obtenidos correctamente", comentarios: Comentarios };
        } catch (error) {
            return { success: false, message: error || 'Error con obtener comentarios', comentarios: {} };
        } finally {
            connection.release();
        }
    }

    static async getComentariosVisibles() {
        const connection = await db.getConnection();
        try {
            const [ComentariosVisibles] = await connection.query('SELECT * FROM comentarios WHERE visible = 1');

            if (!ComentariosVisibles) throw new Error('Error obteniendo comentarios visibles');

            return { success: true, message: "Comentarios obtenidos correctamente", comentarios: ComentariosVisibles };
        } catch (error) {
            return { success: false, message: error || 'Error con obtener comentarios visibles', comentarios: {} };
        }
        finally {
            connection.release();
        }
    }

    static async EnviarMensaje({ nombre, ranking, email, servicio, mensaje }: ComentarioEnviarMensajeProps) {

        const connection = await db.getConnection();
        const mailOptions = MensajeCorreo({ nombre, ranking, email, servicio, mensaje });
        try {
            const info = await transporter.sendMail(mailOptions);

            if (!info.accepted) throw new Error('Error enviando el mensaje');

            const id = generarIdUnico()

            const [resultInsertarComentario] = await connection.query('INSERT INTO comentarios (id, nombre, ranking, email, servicio, mensaje, visible) VALUES (?, ?, ?, ?, ?, ?, ?)', [id, nombre, ranking, email, servicio, mensaje, true]);

            if (!resultInsertarComentario) throw new Error('Error al guardar el mensaje');

            const [Comentario] = await connection.query<ComentarioResponseProps[]>(`SELECT * FROM comentarios WHERE id = ?`, [id]);

            if (!Comentario) throw new Error('Error al obtener el mensaje');

            const ComentarioGuardado = Comentario[0];

            return { success: true, message: 'Comentario enviado correctamente', comentario: ComentarioGuardado }
        }
        catch (error) {
            return { success: false, message: error || 'Error enviando el mensaje', comentario: {} };
        } finally {
            connection.release();
        }

    }

    static async updateComentario({ id, visible }: ComentarioEditarProps) {
        const connection = await db.getConnection();
        try {
            const [resultModificarComentario] = await connection.query('UPDATE comentarios SET visible = ? WHERE id = ?', [visible, id]);

            if (!resultModificarComentario) throw new Error('Error al modificar el comentario');

            const [resultComentarioModificado] = await connection.query<ComentarioEditarResponseProps[]>('SELECT id, visible FROM Comentarios WHERE id = ?', [id]);

            if (!resultComentarioModificado) throw new Error('Error al obtener el comentario modificado');

            const ComentarioModificado = resultComentarioModificado[0];

            return { success: true, message: "Comentario actualizado correctamente", comentario: ComentarioModificado };

        } catch (error) {
            return { success: false, message: error || 'Error al actualizar el comentario', comentario: {} };
        } finally {
            connection.release();
        }
    }


    static async deleteComentario({ id }: { id: UUID }) {
        const connection = await db.getConnection();
        try {
            const [resultEliminarComentario] = await connection.query('DELETE FROM comentarios WHERE id = ?', [id]);

            if (!resultEliminarComentario) throw new Error('Error al eliminar el comentario');

            return { success: true, message: "Se elimino el comentario", comentario: { id } };

        } catch (error) {
            return { success: false, message: error || 'Error al eliminar el comentario', comentario: {} };
        } finally {
            connection.release();
        }
    }
}