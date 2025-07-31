// Middleware para verificar JWT en cookie
import jwt from "jsonwebtoken";
import { SECRET } from "../config";
import { Request, Response, NextFunction } from "express";


export const verificarTokenDesdeCookie = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    console.log({ token });

    if (!SECRET) {
        throw new Error("Ocurrió un error al verificar el token");
    }

    if (!token) {
        throw new Error("No autorizado");
    }

    try {
        jwt.verify(token, SECRET);
        next();
    } catch (error) {
        res.status(403).json({ success: false, message: error || "Token inválido o expirado" });
    }
};
