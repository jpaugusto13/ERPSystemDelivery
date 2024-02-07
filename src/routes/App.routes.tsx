import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';

import { AuthProvider } from '../context/AuthContext';
import Home from '../pages/Home/Home';

import Dashboard from '../pages/Doceria/dashboard/Dashboard';

import Inventario from '../pages/Doceria/Produtos/Inventario';
import Pdv from '../pages/Doceria/Pdv/Pdv';
import Funcionarios from '../pages/Doceria/Funcionarios/Funcionarios';
import Agendamentos from '../pages/Doceria/Agendamentos/Agendamentos';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/doceria" element={<Home />}>
            <Route path="" element={<Dashboard />} />

            <Route path="catalago" element={<Inventario />} />
            <Route path="agendamentos" element={<Agendamentos/>} />
            <Route path="funcionarios" element={<Funcionarios />} />

            <Route path="ponto-de-venda" element={<Pdv />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
