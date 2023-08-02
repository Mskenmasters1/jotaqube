import { FormEvent, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { handlerAxiosError } from '../../helpers/handlerAxiosError';
import { clienteAxios } from '../../config/clienteAxios';
import { ICurso } from '../../interfaces/curso.interface';

interface ICursosFormProps {
	setRefreshCursos: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CursosForm = ({ setRefreshCursos: setRefreshCursos }: ICursosFormProps) => {
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [ok, setOk] = useState<boolean>(true);
	const { form, onInputChange, onResetForm } = useForm<ICurso>({
		nombre: ''
	});

	const { nombre } = form;

	const crearCurso = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setLoading(true);
			setErrorMsg('');
			await clienteAxios.post<ICurso>('/cursos', { nombre });
			onResetForm();
			setOk(true);
			setLoading(false);
			setRefreshCursos(true);
		} catch (error) {
			setOk(false);
			setLoading(false);
			const errores = await handlerAxiosError(error);
			setErrorMsg(errores);
		}
	};

	return (
		<>
			<h1>Crear curso</h1>
			<hr />

			<form onSubmit={crearCurso}>
				<div className="form-group">
					<label htmlFor="nombre">Nombre del curso</label>
					<input id="nombre" type="text" className="form-control" value={nombre} onChange={onInputChange} required />
				</div>
				{nombre === '' && (
					<div className="alert alert-danger" role="alert">
						El nombre del curso es obligatorio
					</div>
				)}
				<button className="btn btn-primary" type="submit" disabled={nombre.trim() === ''}>
					Crear curso
				</button>
			</form>
			{loading && (
				<div className="alert alert-warning" role="alert">
					Creando curso ...
				</div>
			)}
			{!ok && errorMsg && !loading && (
				<div className="alert alert-danger" role="alert">
					{errorMsg}
				</div>
			)}
		</>
	);
};