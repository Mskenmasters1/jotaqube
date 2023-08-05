import express from 'express';
import { Express } from 'express';
import http from 'http';
import cors from 'cors';
import { dbConnection } from './database/config';
import { routerAuth } from './routes/routerAuth';
import { routerUsuarios } from './routes/routerUsuarios';
import { Server, Socket } from 'socket.io';
import { UsuariosConectadosLista } from './classes/usuariosConectadosLista';
import { validarJWT, validarJWTSocket } from './middlewares/validarJWT';
import { routerCursos } from './routes/routerCursos';

const app: Express = express();
const port = process.env.PORT || 3000;

const usuariosConectados = new UsuariosConectadosLista();

dbConnection();

// Middlewares
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.use('/api/auth', routerAuth);
app.use('/api/usuarios', routerUsuarios);
app.use('/api/cursos', validarJWT, routerCursos);
app.use('/api/codigos', validarJWT, routerCodigos);

const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket: Socket) => {
  const valido = validarJWTSocket(socket.handshake.query['x-token'] as string | undefined); // La especificación dice que puede venir como string[], por eso la conversión con as

  if (!valido) {
    console.log('socket no identificado');
    return socket.disconnect();
  }

  console.log(socket.id);
  console.log('Cliente conectado');

  const email = socket.handshake.query['email']?.toString() || '';
  const curso = socket.handshake.query['curso']?.toString() || '';
  usuariosConectados.addUsuario(email, socket.id);

  // Por si al actualizar la página se reconecta a un curso (actualiza codigopage)
  if (curso !== '') {
    usuariosConectados.addToCurso(email, curso);
    socket.join(curso);

    io.to(curso).emit('usuarios-conectados-a-curso', usuariosConectados.getUsuariosDeCurso(curso));
  }

  io.sockets.emit('usuarios-conectados', usuariosConectados.getUsuarios());

  socket.on('disconnect', () => {
    const curso = usuariosConectados.getCursoUsuario(socket.id);
    usuariosConectados.removeUsuario(socket.id);
    io.emit('usuarios-conectados', usuariosConectados.getUsuarios());
    io.to(curso).emit('usuarios-conectados-a-curso', usuariosConectados.getUsuariosDeCurso(curso));
  });

  socket.on('conectar-a-curso', (data: { email: string; curso: string }) => {
    usuariosConectados.addToCurso(data.email, data.curso);
    socket.join(data.curso);

    io.to(data.curso).emit('usuarios-conectados-a-curso', usuariosConectados.getUsuariosDeCurso(data.curso));
  });

  socket.on('desconectar-de-curso', (data: { email: string; curso: string }) => {
    usuariosConectados.addToCurso(data.email, '');
    socket.leave(data.curso);

    io.to(data.curso).emit('usuarios-conectados-a-curso', usuariosConectados.getUsuariosDeCurso(data.curso));
  });

  
// Puesta en marcha
httpServer.listen(port, () => {
  console.log(`Servidor en ejecución en puerto ${port}`);
});
