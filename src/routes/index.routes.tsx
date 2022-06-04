import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import AppRoutes from './App.routes';
import AuthRoutes from './Auth.routes';

const Routes: React.FC = () => {
  const { user } = useContext(AuthContext);
  
  return user ? <AuthRoutes /> : <AppRoutes/>;

};

export default Routes;