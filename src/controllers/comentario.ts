import type { Request, Response } from 'express';
import { ModeloContacto } from '../models/MySQL/comentario';
import { validarId } from '../utils/Validacion';
import { validarComentario, validarComentarioEditar } from '../utils/Validaciones/Comentarios';
import { UUID } from 'crypto';


export class ContrallerContacto {
    static async EnviarMensaje(req: Request, res: Response) {

        const resultDataComentario = validarComentario(req.body);

        if (!resultDataComentario.success) {
            res.status(400).json({ success: false, message: JSON.parse(resultDataComentario.error.message) });
            return;
        }

        const DataComentario = resultDataComentario.data

        const { success, message, comentario } = await ModeloContacto.EnviarMensaje(DataComentario);

        if (success) {
            res.status(200).json({ success, message, comentario });
        } else {
            res.status(500).json({ success, message, comentario: {} });
        }
    }

    static async getComentarios(_req: Request, res: Response) {
        const { success, message, comentarios } = await ModeloContacto.getComentarios();

        if (success) {
            res.status(200).json({ success, message, comentarios });
        } else {
            res.status(500).json({ success, message, comentarios });
        }
    }


    static async getComentariosVisibles(_req: Request, res: Response) {
        const { success, message, comentarios } = await ModeloContacto.getComentariosVisibles();

        if (success) {
            res.status(200).json({ success, message, comentarios });
        } else {
            res.status(500).json({ success, message, comentarios });
        }
    }


    static async updateComentario(req: Request, res: Response) {

        const resultDataVisible = validarComentarioEditar(req.body);

        if (resultDataVisible.error) {
            res.status(400).json({ success: false, message: JSON.parse(resultDataVisible.error.message) });
            return;
        }

        const resultdataIdEditarComentario = validarId(req.params as { id: UUID });

        if (resultdataIdEditarComentario.error) {
            res.status(400).json({ success: false, message: resultdataIdEditarComentario.error.message });
            return;
        }

        const idComentarioModificar = resultdataIdEditarComentario.data.id as UUID;
        const visibleComentario = resultDataVisible.data.visible;

        const { success, message, comentario } = await ModeloContacto.updateComentario({ id: idComentarioModificar, visible: visibleComentario });

        if (success) {
            res.status(200).json({ success, message, comentario });
        } else {
            res.status(500).json({ success, message, comentario: {} });
        }
    }


    static async deleteComentario(req: Request, res: Response) {

        const dataIdEliminarComentario = validarId(req.params as { id: UUID });
        if (dataIdEliminarComentario.error) {
            res.status(400).json({ success: false, message: dataIdEliminarComentario.error.message });
            return;
        }

        const idComentarioEliminar = dataIdEliminarComentario.data.id as UUID;

        const { success, message, comentario } = await ModeloContacto.deleteComentario({ id: idComentarioEliminar });

        if (success) {
            res.status(200).json({ success, message, comentario });
        } else {
            res.status(500).json({ success, message, comentario });
        }
    }



}
