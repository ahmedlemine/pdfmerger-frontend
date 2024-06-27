import Cookies from 'js-cookie';
import { useContext } from 'react';
import { CurrentUserContext } from '../Context';
import { Navigate } from 'react-router-dom';


function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(CurrentUserContext)

  

  if (!isLoggedIn) {
    return <Navigate to={"/login"} replace />
  }

  return children
  
}

export default ProtectedRoute;