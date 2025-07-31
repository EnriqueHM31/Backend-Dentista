import mysql, { Pool } from 'mysql2/promise';

export const db: Pool = mysql.createPool({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    port: Number(process.env.DB_PORT),
    connectionLimit: 5, // pon 5 o menos para que no supere el límite Clever Cloud

});
async function testConnections() {
    const connection = await db.getConnection();
    try {
        const [rows] = await connection.query('SHOW PROCESSLIST');
        console.log('Conexiones abiertas:', rows);
    } finally {
        connection.release();
    }
}

testConnections();