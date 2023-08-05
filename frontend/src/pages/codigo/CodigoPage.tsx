import { useNavigate, useParams } from 'react-router-dom';

export const CodigoPage = () => {
	const { idCurso, nombre } = useParams();
	const navigate = useNavigate();

	const goToCursos = () => {
		navigate('/chat');
	};

	return (
		<>
			<div className="row">
				<div className="col">
					<h1>Bienvenido al curso {nombre}</h1>
				</div>
				<div className="col">
					<button className="btn btn-info" onClick={goToCursos}>
						Volver a cursos
					</button>
				</div>
			</div>

			<hr />
		</>
	);
};