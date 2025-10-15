import { useParams, Link } from "react-router-dom";

export const CourseDetailPage = () => {
	// useParams nos da un objeto con los parámetros dinámicos de la URL
	const { courseId } = useParams();

	return (
		<div>
			<h3>Detalles del Curso</h3>
			<p>
				Mostrando información para el curso: <strong>{courseId}</strong>
			</p>
			<br />
			<Link to="/cursos">Volver a la lista de cursos</Link>
		</div>
	);
};
