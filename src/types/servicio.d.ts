import { RowDataPacket } from "mysql2";

interface ServicioProps {
    id: string;
    titulo: string;
    descripcion: string;
    img: string;
    duration: number;
}

interface ServicioCrearProps extends Omit<ServicioProps, 'id'> { }

export type ServicioEditarProps = Partial<Omit<ServicioProps, 'id'>>;

export interface ServicioResponseProps extends RowDataPacket, ServicioProps { }