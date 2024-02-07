import { Outlet } from 'react-router-dom';
import Sidebar from '../../shared/components/Sidebar/Sidebar';

function Home() {
  return (
    <div className="w-full overflow-hidden flex ct-docs-disable-sidebar-content">
      <Sidebar />
      <main className="h-[100vh] relative overflow-x-hidden overflow-y-hidden md:ml-56 bg-blueGray-100 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default Home;
