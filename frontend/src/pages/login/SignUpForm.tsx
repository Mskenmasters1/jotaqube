import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { ILoginResponse, ISignUp } from '../../interfaces/login.interface';
import { ILocalStorageInfo } from '../../interfaces/localStorageInfo.interface';
import { handlerAxiosError } from '../../helpers/handlerAxiosError';
import { clienteAxios } from '../../config/clienteAxios';

export const SignUpForm = () => {
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const { form, onInputChange } = useForm<ISignUp>({
		email: '',
		password: '',
		password2: ''
	});

	const { email, password, password2 } = form;

	const singUp = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setLoading(true);
			setErrorMsg('');
			const { data } = await clienteAxios.post<ILoginResponse>('/usuarios', { email, password });
			const infoUsuarioStorage: ILocalStorageInfo = {
				email: data.email,
				token: data.token
			};
			localStorage.setItem('usuarioInfo', JSON.stringify(infoUsuarioStorage));
			setLoading(false);
			navigate('/chat', {
				replace: true
			});
		} catch (error) {
			setLoading(false);
			const errores = await handlerAxiosError(error);
			setErrorMsg(errores);
		}
	};

	return (
		<>
			<h1>Crear cuenta</h1>
			<hr />

			<form onSubmit={singUp}>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input id="email" type="email" className="form-control" value={email} onChange={onInputChange} required />
				</div>
				<div className="form-group">
					<label htmlFor="password">Contraseña</label>
					<input
						id="password"
						type="password"
						className="form-control"
						value={password}
						onChange={onInputChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password2">Confirmar contraseña</label>
					<input
						id="password2"
						type="password"
						className="form-control"
						value={password2}
						onChange={onInputChange}
						required
					/>
				</div>
				{password !== password2 && (
					<div className="alert alert-danger" role="alert">
						Las contraseñas no coinciden
					</div>
				)}
				<button className="btn btn-primary" type="submit" disabled={email.trim() === '' || password.trim() === ''}>
					Crear cuenta
				</button>
			</form>
			{loading && (
				<div className="alert alert-warning" role="alert">
					Creando cuenta ...
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
