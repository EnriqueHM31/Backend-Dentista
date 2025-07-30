import { RowDataPacket } from 'mysql2';
import { UUID } from './types';

export interface ComentarioProps {
    id: UUID;
    nombre: string;
    ranking: number;
    email: string;
    servicio: string;
    mensaje: string;
    visible: boolean;
}

export type ComentarioEnviarMensajeProps = Omit<ComentarioProps, 'id', 'visible'>;

export interface ComentarioResponseProps extends RowDataPacket, ComentarioProps { }

export interface ComentarioEditarProps {
    id: UUID;
    visible: boolean;
};

export interface ComentarioEditarResponseProps extends RowDataPacket, ComentarioEditarProps { };