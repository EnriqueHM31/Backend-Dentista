import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from '../config';

export const db = mysql.createPool({
    host: DB_HOST,  // Host de la base de datos
    user: DB_USER,  // Nombre de usuario
    password: DB_PASSWORD,  // Contraseña
    database: DB_NAME,  // Nombre de la base de datos
});

