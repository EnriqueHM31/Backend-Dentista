"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const comentarios_routes_1 = require("./routes/comentarios.routes");
const sociales_routes_1 = require("./routes/sociales.routes");
const login_routes_1 = require("./routes/login.routes");
const preguntas_routes_1 = require("./routes/preguntas.routes");
const datausuario_routes_1 = require("./routes/datausuario.routes");
const servicios_routes_1 = require("./routes/servicios.routes");
const especialistas_routes_1 = require("./routes/especialistas.routes");
const citas_routes_1 = require("./routes/citas.routes");
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173',
    'http://192.168.1.104:5173'];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true); // para herramientas como Postman
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('El CORS no permite el acceso desde este origen.'), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use('/api/comentarios', comentarios_routes_1.ComentariosRouter);
app.use('/api/sociales', sociales_routes_1.SocialesRoutes);
app.use('/api/login', login_routes_1.LoginRouter);
app.use('/api/preguntas', preguntas_routes_1.PreguntasRoutes);
app.use('/api/usuario', datausuario_routes_1.UsuarioRouter);
app.use('/api/servicios', servicios_routes_1.ServiciosRoutes);
app.use('/api/especialistas', especialistas_routes_1.EspecialistasRouter);
app.use('/api/citas', citas_routes_1.CitasRouter);
app.use("/", (_req, res) => {
    res.send("Odontología LEHM");
});
app.listen(config_1.PORT, () => {
    console.log(`Server is running on port ${config_1.PORT}`);
});
