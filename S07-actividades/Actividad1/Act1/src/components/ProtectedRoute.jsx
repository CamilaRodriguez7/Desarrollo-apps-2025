import { Navigate, useLocation } from "react-router-dom";
import { checkAuth } from "../auth";

export const ProtectedRoute = ({ children }) => {
	const location = useLocation();

	if (!checkAuth()) {
		// Redirigimos al usuario a la página de login, pero guardamos la ubicación
		// a la que intentaba ir, para poder redirigirlo de vuelta después de iniciar sesión.
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};
