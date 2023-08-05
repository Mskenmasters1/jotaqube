import { useState, useContext, useEffect } from 'react';
import { IUsuarioInfoContext } from '../../interfaces/context.interface';
import { AppContext } from '../../context/AppContext';
import { clienteAxios } from '../../config/clienteAxios';
import { handlerAxiosError } from '../../helpers/handlerAxiosError';
import { ICodigo } from '../../interfaces/codigo.interface';

interface ICodigoListProps {
	idCurso: number;
}

export const CodigoList = ({ idCurso }: ICodigoListProps) => {
	const { usuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
	const [codigos, setCodigos] = useState<ICodigo[]>([]);
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [ok, setOk] = useState<boolean>(true);
	const { socket } = usuarioInfo;
	socket?.on('codigos-curso', (codigos: ICodigo[]) => {
		setCodigos(codigos);
	});

	useEffect(() => {
		getCodigos();
	}, []);

	const getCodigos = async () => {
		try {
			setLoading(true);
			setErrorMsg('');
			const { data } = await clienteAxios.get<ICodigo[]>(`/codigos/${idCurso}`);
			setCodigos(data);
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
			<h2>Códigos</h2>
			<ul className="list-group">
				{codigos.map((x) => (
					<li className="list-group-item" key={x.idCodigo}>
						{x.usuarios_email} - {transformDate(new Date(x.fechaHora!))}: {x.texto}
					</li>
				))}
			</ul>
			{loading && (
				<div className="alert alert-warning" role="status" aria-live="polite">
					Actualizando códigos...
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
