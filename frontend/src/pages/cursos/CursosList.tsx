import { useEffect, useState } from 'react';
import { clienteAxios } from '../../config/clienteAxios';
import { handlerAxiosError } from '../../helpers/handlerAxiosError';
import { useNavigate } from 'react-router-dom';
import { ICurso } from '../../interfaces/curso.interface';

interface ICursosListProps {
	setRefreshCursos: React.Dispatch<React.SetStateAction<boolean>>;
	refreshCursos: boolean;
}

export const CursosList = ({ refreshCursos: refreshCursos, setRefreshCursos: setRefreshCursos }: ICursosListProps) => {
	const navigate = useNavigate();
	const [cursos, setCursos] = useState<ICurso[]>([]);
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [ok, setOk] = useState<boolean>(true);

	useEffect(() => {
		if (refreshCursos) {
			getCursos();
		}
	}, [refreshCursos]);

	const getCursos = async () => {
		try {
			setLoading(true);
			setErrorMsg('');
			const { data } = await clienteAxios.get<ICurso[]>('/cursos');
			setCursos(data);
			setRefreshCursos(false);
			setLoading(false);
			setOk(true);
		} catch (error) {
			setRefreshCursos(false);
			setOk(false);
			setLoading(false);
			const errores = await handlerAxiosError(error);
			setErrorMsg(errores);
		}
	};

	const goToCurso = async (curso: ICurso) => {
		const url = `/chat/${curso.idCurso}/${curso.nombre}`;
		navigate(url);
	};

	return (
		<>
			{cursos?.length > 0 && (
				<>
					<h2>Total cursos: {cursos.length}</h2>
					<table className="table">
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{cursos.map((x) => (
								<tr key={x.idCurso}>
									<td>{x.nombre}</td>
									<td>
										<button className="btn btn-info" onClick={() => goToCurso(x)}>
											Entrar
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			)}
			{refreshCursos && loading && (
				<div className="alert alert-warning" role="status" aria-live="polite">
					Actualizando cursos...
				</div>
			)}
			{!ok && errorMsg && !refreshCursos && (
				<div className="alert alert-danger" role="status" aria-live="polite">
					{errorMsg}
				</div>
			)}
		</>
	);
};
