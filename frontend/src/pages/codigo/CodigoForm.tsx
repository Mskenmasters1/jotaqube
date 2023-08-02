import { FormEvent, useContext, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { handlerAxiosError } from '../../helpers/handlerAxiosError';
import { IUsuarioInfoContext } from '../../interfaces/context.interface';
import { AppContext } from '../../context/AppContext';
import { clienteAxios } from '../../config/clienteAxios';
import { IMensaje } from '../../interfaces/mensaje.interface';

interface IChatFormProps {
  idSala: number;
  sala: string;
}

export const ChatForm = ({ idSala, sala }: IChatFormProps) => {
  const { usuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { form, onInputChange } = useForm<IMensaje>({
    usuarios_email: usuarioInfo.email,
    texto: '',
    salas_idSala: idSala
  });

  const { usuarios_email, texto, salas_idSala } = form;

  const send = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMsg('');
      await clienteAxios.post<IMensaje>('/mensajes', { usuarios_email, texto, salas_idSala, sala });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errores = await handlerAxiosError(error);
      setErrorMsg(errores);
    }
  };

  return (
    <>
      <h2>Enviar mensaje</h2>
      <hr />

      <form onSubmit={send}>
        <div className="form-group">
          <label htmlFor="texto">Texto</label>
          <input id="texto" type="texto" className="form-control" value={texto} onChange={onInputChange} required />
        </div>

        <button className="btn btn-success" type="submit" disabled={texto.trim() === ''}>
          Enviar
        </button>
      </form>
      {loading && (
        <div className="alert alert-warning" role="alert">
          Enviando mensaje...
        </div>
      )}
      {/* Si errorFetch es true, mostramos un mensaje de error al usuario */}
      {errorMsg && !loading && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}
    </>
  );
};
