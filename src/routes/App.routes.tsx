import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';

import { AuthProvider } from '../context/AuthContext';
import Home from '../pages/Home/Home';

import Dashboard from '../pages/Doceria/dashboard/Dashboard';

import Inventario from '../pages/Doceria/Produtos/Inventario';
import Pdv from '../pages/Doceria/Pdv/Pdv';
import SignCategoria from '../pages/Doceria/Pdv/components/Categoria/signCategoria/signCategoria';
import Funcionarios from '../pages/Doceria/Funcionarios/Funcionarios';
import VendaPdv from '../pages/Doceria/Pdv/components/Vendas/VendaPdv';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/doceria" element={<Home />}>
            <Route path="" element={<Dashboard />} />

            <Route path="catalago" element={<Inventario />} />

            <Route path="funcionarios" element={<Funcionarios />} />

            <Route path="ponto-de-venda" element={<Pdv />}>
              <Route path="vendas" element={<VendaPdv />} />
              <Route path="categorias" element={<SignCategoria />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
