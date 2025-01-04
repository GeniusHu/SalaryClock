import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/cookieUtils';

function ProtectedRoute({ children }) {
  const isAuthenticated = !!getToken();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute; 