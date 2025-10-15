import { Link } from "react-router-dom";

export const CoursesPage = () => {
	return (
		<div>
			<h2>Nuestros Cursos Disponibles</h2>
			<p>Selecciona un curso para ver más detalles:</p>
			<ul style={{ listStyle: "none", padding: 0 }}>
				<li style={{ marginBottom: "10px" }}>
					<Link to="/cursos/react">Curso de React</Link>
				</li>
				<li style={{ marginBottom: "10px" }}>
					<Link to="/cursos/nodejs">Curso de Node.js</Link>
				</li>
				<li style={{ marginBottom: "10px" }}>
					<Link to="/cursos/sql">Curso de SQL</Link>
				</li>
			</ul>
		</div>
	);
};
