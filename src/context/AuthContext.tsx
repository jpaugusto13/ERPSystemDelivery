import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormDataLogin } from '../pages/Auth/Login';

import Swal from 'sweetalert2';
import api from '../services/api';

interface AuthContextData {
  isLoggedIn: boolean;
  logout: () => void;
  signIn: ({ email, senha }: FormDataLogin) => void;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const keyToken = 'token@doceria';
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Função de SignIn de usuário
  const signIn = async (data: FormDataLogin) => {
    Swal.showLoading();
    await api.post('user/login', data).then(({ data }) => { 
      navigate('/doceria');
      
      Swal.fire({
        title: 'Sucesso!',
        text: 'Seja bem-vindo!',
        icon: "success",
        timer: 1500,
      });

      setIsLoggedIn(true);
      localStorage.setItem(keyToken, data.token);

    }).catch(({ response }) => {
      const { data } = response;
        Swal.fire({
          title: 'Ops...',
          text: data.erro,
          icon: "error",
          timer: 1500,
        });
    });
  };

  // Função de logout de usuário
  const logout = () => {
    localStorage.removeItem(keyToken);
    setIsLoggedIn(false);
    navigate('/logout');
  };

  return (
    <AuthContext.Provider value={{ signIn, logout, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
