import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { IUsuarioInfoContext } from '../interfaces/context.interface';

export const LogoutButton = () => {
	const { usuarioInfo, setUsuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
	const { socket } = usuarioInfo;
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('usuarioInfo');
		socket?.disconnect();
		setUsuarioInfo({ email: '', socket: undefined });
		navigate('/', {
			replace: true
		});
	};

	return (
		<>
			<span>
				Bienvenido, <b>{usuarioInfo.email} </b>
			</span>
			<button className="btn btn-warning" onClick={logout}>
				Cerrar sesión
			</button>
		</>
	);
};