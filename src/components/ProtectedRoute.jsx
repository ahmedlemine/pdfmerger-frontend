import Cookies from 'js-cookie';

function ProtectedRoute({ children }) {

  const token = Cookies.get('access_token');

  if (!token) {
    return <p>Please Login</p>;
  }

  return children
  
}

export default ProtectedRoute;