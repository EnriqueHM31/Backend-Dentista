import { ModeloPreguntas } from '../models/MySQL/preguntas';
import { validarId } from '../utils/Validacion';
import { validarEditarPregunta, validarPregunta } from '../utils/Validaciones/Preguntas';
import { Request, Response } from 'express';
import type { PreguntaProps, PreguntaEditarProps } from '../types/pregunta';
import { UUID } from '../types/types';

export class ControllerPreguntas {
    static async getAll(_req: Request, res: Response) {
        try {
            const { success, message, preguntas } = await ModeloPreguntas.getAll();

            if (success) {
                res.status(200).json({ success, message, preguntas });
            } else {
                res.status(500).json({ success, message, preguntas: [] });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener las preguntas' + error, preguntas: [] });
        }
    }


    static async createPregunta(req: Request, res: Response) {

        const resultDataCrearPregunta = validarPregunta(req.body);

        if (resultDataCrearPregunta.error) {
            res.status(400).json({ success: false, message: JSON.parse(resultDataCrearPregunta.error.message) });
        }

        const dataCrearPregunta = resultDataCrearPregunta.data as PreguntaProps;

        const { success, message, pregunta } = await ModeloPreguntas.createPregunta(dataCrearPregunta);

        if (success) {
            res.status(200).json({ success, message, pregunta });
        } else {
            res.status(500).json({ success, message, pregunta: {} });
        }
    }

    static async updatePregunta(req: Request, res: Response) {

        const dataEditarPregunta = validarEditarPregunta(req.body);

        const dataIdEditarPregunta = validarId({ id: req.params.id as UUID });
        if (dataIdEditarPregunta.error) {
            res.status(400).json({ success: false, message: dataIdEditarPregunta.error.message });
            return;
        }

        if (dataEditarPregunta.error) {
            res.status(400).json({ success: false, message: JSON.parse(dataEditarPregunta.error.message) });
            return;
        }

        const idPreguntaModificar = dataIdEditarPregunta.data.id as UUID;
        const preguntaAModificar = dataEditarPregunta.data as PreguntaEditarProps;

        const { success, message, pregunta } = await ModeloPreguntas.updatePregunta({ id: idPreguntaModificar, camposPregunta: preguntaAModificar });

        if (success) {
            res.status(200).json({ success, message, pregunta });
        } else {
            res.status(500).json({ success, message, pregunta: {} });
        }
    }

    static async deletePregunta(req: Request, res: Response) {

        const dataIdEliminarPregunta = validarId({ id: req.params.id as UUID });
        if (dataIdEliminarPregunta.error) {
            res.status(400).json({ success: false, message: dataIdEliminarPregunta.error.message });
            return;
        }

        const idPreguntaEliminar = dataIdEliminarPregunta.data.id as UUID;

        const { success, message, pregunta } = await ModeloPreguntas.deletePregunta({ id: idPreguntaEliminar });

        if (success) {
            res.status(200).json({ success, message, pregunta });
        } else {
            res.status(500).json({ success, message, pregunta: {} });
        }
    }
}