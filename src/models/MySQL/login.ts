import { RowDataPacket } from 'mysql2';
import { db } from '../../database/db';
import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.SECRET ?? (() => {
    throw new Error("SECRET no está definido en .env");
})();

interface Usuario extends RowDataPacket {
    username: string;
    password: string;
}

export class ModeloLogin {
    static async InicioSesion(username: string, password: string) {

        const id = process.env.USUARIO_ID;
        try {
            const [result] = await db.query<Usuario[]>('SELECT * FROM Usuario WHERE id = ?', [id]);

            if (result.length === 0) {
                return { success: false, message: 'Usuario no encontrado.', token: '' };
            }

            if (result[0].username !== username) {
                return { success: false, message: 'Contraseña incorrecta.', token: '' };
            }

            if (result[0].password !== password) {
                return { success: false, message: 'Contraseña incorrecta.', token: '' };
            }

            const token = jwt.sign({ role: 'admin', username: result[0].username }, JWT_SECRET, { expiresIn: '1h' });

            return { success: true, mesaage: 'Sesión iniciada correctamente', token: token };

        } catch (error) {
            return { success: false, message: 'Error al iniciar sesión', token: '' };
        }
    }
}