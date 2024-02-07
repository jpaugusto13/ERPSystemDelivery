import HeaderSidebar from './components/HeaderSidebar/HeaderSidebar';

import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import AlarmIcon from '@mui/icons-material/Alarm';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

import Menu from './components/Menu/Menu';
import CategoryMenu from './components/CategoryMenu/CategoryMenu';
import ItemMenu from './components/ItemMenu/ItemMenu';

export default function Sidebar() {
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <div className="fixed flex flex-col top-0 left-0 w-56 bg-white h-full">
        <HeaderSidebar />
        <div className="overflow-x-hidden flex-grow">
          <Menu>
            <CategoryMenu>Loja</CategoryMenu>
            <div className='p-2'>
              <ItemMenu icon={<PointOfSaleOutlinedIcon />} route="ponto-de-venda">
                PDV
              </ItemMenu>
              <ItemMenu icon={<AlarmIcon />} route="agendamentos">
                Agendamentos
              </ItemMenu>
            </div>
            <CategoryMenu>Gerenciamento</CategoryMenu>
            <div className='p-2'>
              <ItemMenu icon={<DashboardOutlinedIcon />} route="">
                Painel
              </ItemMenu>
              <ItemMenu icon={<Inventory2OutlinedIcon />} route="catalago">
                Estoque
              </ItemMenu>
              <ItemMenu icon={<PeopleAltOutlinedIcon />} route="">
                Clientes
              </ItemMenu>
              <ItemMenu icon={<BadgeOutlinedIcon />} route="funcionarios">
                Funcionários
              </ItemMenu>
              <ItemMenu icon={<StoreMallDirectoryOutlinedIcon />} route="">
                Empresa
              </ItemMenu>
              <ItemMenu icon={<SmartToyOutlinedIcon />} route="">
                Chatbot
              </ItemMenu>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
}