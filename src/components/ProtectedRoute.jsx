import Cookies from 'js-cookie';
import { useContext } from 'react';
import { MergerContext } from '../Context';
import { Navigate } from 'react-router-dom';


function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(MergerContext)

  

  if (!isLoggedIn) {
    return <Navigate to={"/login"} replace />
  }

  return children
  
}

export default ProtectedRoute;