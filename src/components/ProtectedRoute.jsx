import { useContext } from "react";
import CurrentUserContext from "../Context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(CurrentUserContext);

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />;
    }
    return children;
}
export default ProtectedRoute;
