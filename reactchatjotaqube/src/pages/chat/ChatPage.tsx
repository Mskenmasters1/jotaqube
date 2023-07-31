import { useNavigate, useParams } from 'react-router-dom';

export const ChatPage = () => {
  const { idSala, nombre } = useParams();
  const navigate = useNavigate();

  const goToSalas = () => {
    navigate('/chat');
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Benvenido a la sala {nombre}</h1>
        </div>
        <div className="col">
          <button className="btn btn-info" onClick={goToSalas}>
            Volver a salas
          </button>
        </div>
      </div>

      <hr />
    </>
  );
};