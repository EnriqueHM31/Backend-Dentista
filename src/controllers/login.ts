import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ModeloLogin } from '../models/MySQL/login';
import { NODE_ENV, NOMBRE_COOKIE, SECRET } from '../config';

export class ControllerLogin {


    static async InicioSesion(req: Request, res: Response) {
        const { username, password } = req.body as { username: string, password: string };

        if (!username || !password) {
            res.status(200).json({ success: false, message: 'Credenciales incompletas.' });
        }

        if (typeof username !== 'string' || typeof password !== 'string') {
            res.status(200).json({ success: false, message: 'Credenciales incorrectas.' });
        }

        try {
            const { success, message, token } = await ModeloLogin.InicioSesion(username, password);

            if (!success) {
                res.status(200).json({ success: false, message: message, token: '' });
            }

            console.log({ value: NODE_ENV === "production" });
            res.cookie(NOMBRE_COOKIE, token, {
                httpOnly: true,
                secure: NODE_ENV === 'production',
                sameSite: 'none',
                maxAge: 60 * 60 * 1000,
                path: '/',
            });

            res.status(200).json({ success: true, message: 'Sesión iniciada correctamente', token: token });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al iniciar sesión: ' + error });
        }
    }

    static async Autenticacion(req: Request, res: Response) {
        const token = req.cookies.token;
        console.log('hola', { hola: req.cookies })
        console.log('secret', { SECRET })
        console.log('token', { token })
        if (!SECRET) res.status(401).json({ success: false, message: 'No se ha definido el valor' });

        if (!token) res.status(200).json({ success: false, message: 'Token no encontrado' });

        try {
            const decoded = jwt.verify(token, SECRET as string) as { role: string, username: string };
            res.json({ success: true, message: { role: decoded.role, username: decoded.username } });
        } catch (error) {
            res.status(401).json({ success: false, message: error || 'Token inválido o expirado' });
        }
    }


    static async Logout(_req: Request, res: Response) {
        try {
            res.clearCookie(NOMBRE_COOKIE);
            res.status(200).json({ success: true, message: 'Sesión cerrada correctamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al cerrar sesión' });
        }
    }
}


