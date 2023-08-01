import { IUsuarioConectado } from '../interfaces/usuarioConectado.interface';
import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { IUsuarioInfoContext } from '../interfaces/context.interface';

interface IUsersConnectedToRoom {
  sala: string;
}

export const UsersConnectedToRoomList = ({ sala }: IUsersConnectedToRoom) => {
  const { usuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
  const [usuariosConectados, setUsuariosConectados] = useState<IUsuarioConectado[]>([]);
  const { socket } = usuarioInfo;
  socket?.on(`usuarios-conectados-a-sala`, (usuariosConectados: IUsuarioConectado[]) => {
    setUsuariosConectados(usuariosConectados);
  });

  return (
    <>
      <h2>Usuarios contectados a la sala {sala}</h2>
      <ul className="list-group">
        {usuariosConectados.map((x) => (
          <li className="list-group-item" key={x.idSesion}>
            {x.email}
          </li>
        ))}
      </ul>
    </>
  );
};