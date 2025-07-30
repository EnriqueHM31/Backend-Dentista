import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ComentariosRouter } from './routes/comentarios.routes';
import { SocialesRoutes } from './routes/sociales.routes';
import { LoginRouter } from './routes/login.routes';
import { PreguntasRoutes } from './routes/preguntas.routes';
import { UsuarioRouter } from './routes/datausuario.routes';
import { ServiciosRoutes } from './routes/servicios.routes';
import { EspecialistasRouter } from './routes/especialistas.routes';
import { CitasRouter } from './routes/citas.routes';
import { PORT } from './config';


const app = express();
app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173',
    'http://192.168.1.104:5173', 'https://dentista-ckilsr2uh-enrique-s-projects-104cc828.vercel.app/'];




app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // para herramientas como Postman

        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('El CORS no permite el acceso desde este origen.'), false);
        }

        return callback(null, true);
    },
    credentials: true,
}));

app.use(cookieParser());


app.use('/api/comentarios', ComentariosRouter);
app.use('/api/sociales', SocialesRoutes);
app.use('/api/login', LoginRouter);
app.use('/api/preguntas', PreguntasRoutes);
app.use('/api/usuario', UsuarioRouter);
app.use('/api/servicios', ServiciosRoutes);
app.use('/api/especialistas', EspecialistasRouter);
app.use('/api/citas', CitasRouter);

app.use("/", (_req, res) => {
    res.send("Servicios de Odontología LEHM");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})