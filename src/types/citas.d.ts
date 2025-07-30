import { RowDataPacket } from 'mysql2';
import { UUID } from './types';
export interface CitaProps {
    id: UUID;
    nombre: string;
    email: string;
    comentarios: string;
    telefono: string;
    servicio: UUID
    fecha: string;
    hora: string;
    completado: boolean;
    aceotada: boolean;
}

export interface CitaResponseProps extends RowDataPacket, CitaProps { }


export interface CitaEditarProps {
    id: UUID;
    completado: boolean;
};

export type CitaCrearProps = Omit<CitaProps, 'id'>;

