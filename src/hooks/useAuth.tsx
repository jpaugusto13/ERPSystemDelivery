import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);

  const { signIn, logout, isLoggedIn, setIsLoggedIn } = context;

  return {
    signIn,
    logout,
    setIsLoggedIn,
    isLoggedIn,
  };
}
