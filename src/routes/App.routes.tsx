import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Login from "../pages/Auth/Login";

import { AuthProvider } from "../context/AuthContext";
import Home from "../pages/Home/Home";
import SignProduto from "../pages/Doceria/Produtos/components/RegistrarProduto/RegistrarProduto";
import EstoqueProdutos from "../pages/Doceria/Produtos/components/Inventário/EstoqueProdutos";
import Dashboard from "../pages/Doceria/dashboard/Dashboard";

import Inventario from "../pages/Doceria/Produtos/Inventario";
import Pdv from "../pages/Doceria/Pdv/Pdv";
import SignCategoria from "../pages/Doceria/Pdv/components/Categoria/signCategoria/signCategoria";
import Agendamentos from "../pages/Doceria/Pdv/components/Agendamentos/Agendamentos";
import Funcionarios from "../pages/Doceria/Funcionarios/Funcionarios";
import VendaPdv from "../pages/Doceria/Pdv/components/Vendas/VendaPdv";
import SaleProvider from "../context/SaleContext";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SaleProvider>

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/doceria" element={<Home />} >

              <Route path="" element={<Dashboard />} />

              <Route path="inventario" element={<Inventario />}>
                <Route path="cadastrar/produto" element={<SignProduto />}/>
                <Route path="estoque/produto" element={<EstoqueProdutos button="editar" descricaoOn={true}/>} />
              </Route>

              <Route path="funcionarios" element={<Funcionarios />}/>

              <Route path="ponto-de-venda" element={<Pdv />} >
                <Route path="vendas" element={<VendaPdv />} />
                <Route path="Agendamentos" element={<Agendamentos />} />
                <Route path="categorias" element={<SignCategoria/>} />
              </Route>
    
            </Route>
          </Routes>
          
        </SaleProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppRoutes;