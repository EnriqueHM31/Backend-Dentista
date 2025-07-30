import { RowDataPacket } from "mysql2";

export interface UsuarioProps {
    username: string;
    password: string;
}

export type UsuarioEditarProps = Partial<UsuarioProps>;

export interface CambiosUsuarioProps {
    cambiosUsuario: Partial<UsuarioProps>;
}

export interface UsuarioEditarResponseProps extends RowDataPacket, UsuarioProps { }