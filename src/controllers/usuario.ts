import { Request, Response } from 'express'
import { ModeloUsuario } from '../models/MySQL/usuario';
import { validarEditarUsuario } from '../utils/Validacion';
import { UsuarioEditarProps } from '../types/usuario';

export class ContrallerUsuario {


    static async getUsuario(_req: Request, res: Response) {
        try {
            const { success, message, usuario } = await ModeloUsuario.getUsuario();

            if (success) {
                res.status(200).json({ success, message, usuario });
            }
            else {
                res.status(500).json({ success, message, usuario: {} });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error en la base de datos' });
        }
    }

    static async updateUsuario(req: Request, res: Response) {
        const resultDataModificarUsuario = validarEditarUsuario(req.body);

        if (resultDataModificarUsuario.error) {
            res.status(400).json({ success: false, message: JSON.parse(resultDataModificarUsuario.error.message) });
            return;
        }

        const dataModificarUsuario = resultDataModificarUsuario.data as UsuarioEditarProps;

        const { success, message, usuario } = await ModeloUsuario.updateUsuario({ cambiosUsuario: dataModificarUsuario });

        if (success) {
            res.status(200).json({ success, message, usuario });
        } else {
            res.status(500).json({ success, message, usuario: {} });
        }
    }



}