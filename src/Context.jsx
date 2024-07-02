import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const CurrentUserContext = createContext({});
import { isAccessTokenExpired } from "./utils/auth";

const accessTokenCookie = Cookies.get("access_token");

export const CurrentUserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!accessTokenCookie && !isAccessTokenExpired(accessTokenCookie)
    );
    const [user, setUser] = useState({});

    return (
        <CurrentUserContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
            }}
        >
            {children}
        </CurrentUserContext.Provider>
    );
};

export default CurrentUserContext;
