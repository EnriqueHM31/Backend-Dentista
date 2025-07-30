import { RowDataPacket } from "mysql2";

export interface SocialProps {
    id: string;
    nombre: string;
    referencia: string;
}

export interface SocialEditarProps {
    id: string;
    referencia: string;
}

export interface SocialResponseProps extends RowDataPacket, SocialProps { }