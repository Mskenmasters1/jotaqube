import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LogoutButton } from '../components/LogoutButton';
import { io } from 'socket.io-client';
import { useContext, useEffect, useState } from 'react';
import { SocketStatus } from '../components/SocketStatus';
import { ILocalStorageInfo } from '../interfaces/localStorageInfo.interface';
import { AppContext } from '../context/AppContext';
import { IUsuarioInfoContext } from '../interfaces/context.interface';

export const PagesLayout = () => {
	const { usuarioInfo, setUsuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
	const navigate = useNavigate();
	const location = useLocation();
	const { socket } = usuarioInfo;

	const [online, setOnline] = useState(false);

	useEffect(() => {
		if (!socket) {
			const info = localStorage.getItem('usuarioInfo');

			if (info) {
				const email = (JSON.parse(info) as ILocalStorageInfo).email;

				const newSocket = io(`${import.meta.env.VITE_BACKEND_SOCKET}`, {
					transports: ['websocket'],
					query: { email: email },
					forceNew: true
				});

				setUsuarioInfo({ email, socket: newSocket });
			}
		}
	}, []);

	useEffect(() => {
		if (socket) {
			socket.on('connect', () => {
				setOnline(true);
			});
			socket.on('disconnect', () => {
				setOnline(false);
			});
		}
	}, [socket]);

	useEffect(() => {
		if (!usuarioInfo.email && !location.pathname.includes('login')) {
			navigate('/', {
				replace: true
			});
		}
	}, [location.pathname]);

	return (
		<>
			<header className="container">
				<div className="row">
					<div className="col-4">
						<h1>Código</h1>
					</div>
					<div className="col-4">
						<SocketStatus online={online} />
					</div>
					<div className="col-4 mt-2">
						<LogoutButton />
					</div>
				</div>
			</header>
			<hr />
			<main className="container">
				<div className="row">
					<div className="col">
						<Outlet />
					</div>
				</div>
			</main>
		</>
	);
};