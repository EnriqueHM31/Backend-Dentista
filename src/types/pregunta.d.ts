import { RowDataPacket } from "mysql2";
import { UUID } from "./types";

export interface PreguntaProps {
    id: UUID
    pregunta: string;
    respuesta: string;
}

export type PreguntaCrearProps = Omit<PreguntaProps, 'id'>;
export type PreguntaEditarProps = Partial<PreguntaProps>;

export interface PreguntaCrearResponseProps extends RowDataPacket, PreguntaProps { }
