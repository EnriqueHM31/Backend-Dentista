import { db } from '../../database/db';
import { validarId } from '../../utils/Validacion';
import { USUARIO_ID } from '../../config';
import { UUID } from '../../types/types';
import { CambiosUsuarioProps, UsuarioEditarProps, UsuarioEditarResponseProps } from '../../types/usuario';

export class ModeloUsuario {

    static async getUsuario() {
        const connection = await db.getConnection();
        try {
            if (!USUARIO_ID) throw new Error("No se ha definido el ID de usuario");

            const resultID = validarId({ id: USUARIO_ID as UUID });

            if (resultID.error) {
                return { success: false, message: 'ID de usuario no válido', usuario: {} };
            }

            const ID_USER = resultID.data.id as UUID;

            const [resultDataUsuario] = await connection.query<UsuarioEditarResponseProps[]>(`SELECT username, password FROM usuario WHERE id = ?`, [ID_USER]);

            if (!resultDataUsuario) throw new Error("No se ha encontrado el usuario");

            const Datausuario = resultDataUsuario[0];
            return {
                success: true, message: "Usuario obtenido correctamente", usuario: Datausuario
            };
        } catch (error) {
            return { success: false, message: error || "Error al obtener el usuario", usuario: {} };
        } finally {
            connection.release();
        }
    }

    static async updateUsuario({ cambiosUsuario }: CambiosUsuarioProps) {
        const connection = await db.getConnection();

        try {

            if (!USUARIO_ID) throw new Error("No se ha definido el ID de usuario");
            const resultID = validarId({ id: USUARIO_ID as UUID });

            if (resultID.error) {
                return { success: false, message: 'ID de usuario no válido' };
            }

            const allowedFields = ['username', 'password'];

            const fields: string[] = [];
            const values: string[] = [];

            for (const key of Object.keys(cambiosUsuario) as (keyof UsuarioEditarProps)[]) {
                if (allowedFields.includes(key as keyof UsuarioEditarProps) && cambiosUsuario[key] !== undefined) {
                    fields.push(`${key} = ?`);
                    values.push(cambiosUsuario[key] as string);
                }
            }

            if (fields.length === 0) {
                return { success: false, message: 'No se proporcionaron campos para actualizar' };
            }

            const ID_USER = resultID.data.id as UUID;

            values.push(ID_USER);

            const query = `UPDATE usuario SET ${fields.join(', ')} WHERE id = ?`;
            const [resultModificarUsuario] = await connection.query(query, values);

            if (!resultModificarUsuario) throw new Error('Error al modificar el usuario');

            const [resultUsuarioModificado] = await connection.query<UsuarioEditarResponseProps[]>('SELECT * FROM usuario WHERE id = ?', [ID_USER]);

            if (!resultUsuarioModificado) throw new Error('Error al obtener el usuario modificado');

            const UsuarioModificado = resultUsuarioModificado[0];

            return { success: true, message: "Usuario actualizado correctamente", usuario: UsuarioModificado };

        } catch (error) {
            return { success: false, message: error || 'Error al actualizar el usuario', usuario: {} };
        } finally {
            connection.release();
        }
    }
}
