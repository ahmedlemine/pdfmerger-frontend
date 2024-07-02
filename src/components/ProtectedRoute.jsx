import { useContext } from "react";
import CurrentUserContext from "../Context";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(CurrentUserContext);
    const location = useLocation()


    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ next: location }}  replace />;
    }
    return children;
}
export default ProtectedRoute;
