import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getToken, deleteToken } from "../Components/helpers/tokenUtils";
import { LOGIN_TOKEN_NAME } from "../Components/helpers/Constants";

export default function RequireAuth() {
     /**
      * This function checks if a user has a valid token and should be permitted access to dashboard. If not, they are redirected to the login page. 
      * <Outlet /> component represents any child components of RequireAuth.
      */
    const location = useLocation();
    let loggedIn = getToken(LOGIN_TOKEN_NAME);
    if (loggedIn && loggedIn.expiry) {
        if (loggedIn.expiry < Date.now()) {
            deleteToken(LOGIN_TOKEN_NAME);
            loggedIn = null;
        }
    }
    return (
       loggedIn?.token
            ? <Outlet />
            : <Navigate to="/login" />
    );
}
