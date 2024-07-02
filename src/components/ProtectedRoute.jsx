import { useContext } from "react";
import CurrentUserContext from "../Context";
import { Navigate, useLocation } from "react-router-dom";

import Coockies from "js-cookie";
import { isAccessTokenExpired } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, setIsLoggedIn } = useContext(CurrentUserContext);
    const location = useLocation();

    const accessToken = Coockies.get("access_token");

    if (
        !isLoggedIn ||
        !accessToken ||
        accessToken === undefined ||
        isAccessTokenExpired(accessToken)
    ) {
        setIsLoggedIn(false);
        return <Navigate to="/login" state={{ next: location }} replace />;
    }
  

    return children;
};
export default ProtectedRoute;
