// Middleware para verificar JWT en cookie
import jwt from "jsonwebtoken";
import { SECRET } from "../config";
import { Request, Response, NextFunction } from "express";


export const verificarTokenDesdeCookie = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!SECRET) {
        throw new Error("Ocurrió un error al verificar el token");
    }
    if (!token) {
        res.status(401).json({ success: false, message: "Token no proporcionado" });
    }

    try {
        jwt.verify(token, SECRET);
        next();
    } catch (err) {
        res.status(403).json({ success: false, message: "Token inválido o expirado" });
    }
};
