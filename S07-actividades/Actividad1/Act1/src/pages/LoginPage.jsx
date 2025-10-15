import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../auth";

export const LoginPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// Obtenemos la ruta a la que se intentó acceder antes de ser redirigido aquí
	const from = location.state?.from?.pathname || "/dashboard";

	const handleLogin = () => {
		login(() => {
			// Redirigimos al usuario a la página que intentaba visitar o al dashboard
			navigate(from, { replace: true });
		});
	};

	return (
		<div>
			<h2>Iniciar Sesión</h2>
			<p>Debes iniciar sesión para acceder a esta página.</p>
			<button onClick={handleLogin}>Iniciar Sesión</button>
		</div>
	);
};
