// PrivateRoute.js
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { credentials} = useAuth();

  return credentials ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};

export default PrivateRoute;