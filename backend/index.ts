import express from 'express';
import { Express } from 'express';
import cors from 'cors';
import { dbConnection } from './database/config';
import { routerAuth } from './routes/routerAuth';
import { routerUsuarios } from './routes/routerUsuarios';
import { routerSalas } from './routes/routerSalas';

const app: Express = express();
const port = process.env.PORT || 3000;

dbConnection();

// Middlewares
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.use('/api/auth', routerAuth);
app.use('/api/usuarios', routerUsuarios);
app.use('/api/salas', routerSalas);

// Puesta en marcha
app.listen(port, () => {
  console.log(`Servidor en ejecución en puerto ${port}`);
});
