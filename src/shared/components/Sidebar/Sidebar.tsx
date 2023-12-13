import HeaderSidebar from './components/HeaderSidebar/HeaderSidebar';

import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

import Menu from './components/Menu/Menu';
import CategoryMenu from './components/CategoryMenu/CategoryMenu';
import ItemMenu from './components/ItemMenu/ItemMenu';

function Sidebar() {
  const handleClick = () => {

  }

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <HeaderSidebar />
          <Menu>
            <CategoryMenu>Loja</CategoryMenu>
            <ItemMenu icon={<DashboardOutlinedIcon />} route=''>Painel</ItemMenu>
            <ItemMenu icon={<PointOfSaleOutlinedIcon />} route="ponto-de-venda">PDV</ItemMenu>
            <ItemMenu icon={<MenuBookOutlinedIcon />} route='inventario'>Catálogo</ItemMenu>
            <CategoryMenu>Gerenciamento</CategoryMenu> 
            <ItemMenu icon={<PeopleAltOutlinedIcon />} route=''>Clientes</ItemMenu>
            <ItemMenu icon={<BadgeOutlinedIcon />} route='funcionarios'>Funcionários</ItemMenu>
            <ItemMenu icon={<StoreMallDirectoryOutlinedIcon />} route=''>Empresa</ItemMenu>
            <ItemMenu icon={<Inventory2OutlinedIcon />} route=''>Estoque</ItemMenu>
            <ItemMenu icon={<SmartToyOutlinedIcon />} route=''>Chatbot</ItemMenu>

            <CategoryMenu>Usuário</CategoryMenu>
            <ItemMenu icon={<SettingsOutlinedIcon />} route=''>Configurações</ItemMenu>
            <ItemMenu icon={<LogoutOutlinedIcon />} route=''><button onClick={handleClick}>Sair</button></ItemMenu>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
