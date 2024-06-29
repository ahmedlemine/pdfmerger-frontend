import { jwtDecode } from 'jwt-decode';

export const isAccessTokenExpired = (accessToken) => {
    try {
        const decodedToken = jwtDecode(accessToken);
        return decodedToken.exp < Date.now() / 1000;
    } catch (err) {
        return true; // = token is invalid or expired
    }
};


