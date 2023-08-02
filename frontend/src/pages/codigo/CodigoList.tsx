import { useState, useContext, useEffect } from 'react';
import { IUsuarioInfoContext } from '../../interfaces/context.interface';
import { AppContext } from '../../context/AppContext';
import { IMensaje } from '../../interfaces/mensaje.interface';
import { clienteAxios } from '../../config/clienteAxios';
import { handlerAxiosError } from '../../helpers/handlerAxiosError';

interface IChatMensajesListProps {
  idSala: number;
}

export const ChatMensajesList = ({ idSala }: IChatMensajesListProps) => {
  const { usuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
  const [mensajes, setMensajes] = useState<IMensaje[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [ok, setOk] = useState<boolean>(true);
  const { socket } = usuarioInfo;
  socket?.on('mensajes-sala', (mensajes: IMensaje[]) => {
    setMensajes(mensajes);
  });

  useEffect(() => {
    getMensajes();
  }, []);

  const getMensajes = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const { data } = await clienteAxios.get<IMensaje[]>(`/mensajes/${idSala}`);
      setMensajes(data);
      setLoading(false);
      setOk(true);
    } catch (error) {
      setOk(false);
      setLoading(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  const transformDate = (fechaHora: Date) => {
    return `${padL(fechaHora.getMonth() + 1)}/${padL(fechaHora.getDate())}/${fechaHora.getFullYear()} ${padL(
      fechaHora.getHours()
    )}:${padL(fechaHora.getMinutes())}:${padL(fechaHora.getSeconds())}
    `;
  };

  const padL = (nr: number, len = 2, chr = `0`) => `${nr}`.padStart(len, chr);

  return (
    <>
      <h2>Mensajes</h2>
      <ul className="list-group">
        {mensajes.map((x) => (
          <li className="list-group-item" key={x.idMensaje}>
            {x.usuarios_email} - {transformDate(new Date(x.fechaHora!))}: {x.texto}
          </li>
        ))}
      </ul>
      {loading && (
        <div className="alert alert-warning" role="status" aria-live="polite">
          Actualizando mensajes...
        </div>
      )}
      {!ok && errorMsg && (
        <div className="alert alert-danger" role="status" aria-live="polite">
          {errorMsg}
        </div>
      )}
    </>
  );
};
