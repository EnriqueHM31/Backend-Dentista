import { RowDataPacket } from "mysql2";

export interface EspecialistaProps {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    avatar: string;
    linkedin: string;
    servicio: string;
}

export interface EspecialistaCrearProps {
    dataEspecialista: EspecialistaProps
}

export interface EspecialistaResponseProps extends RowDataPacket, EspecialistaProps { }

export interface EspecialistaEditarProps extends Ommit<EspecialistaProps, 'id'> { }