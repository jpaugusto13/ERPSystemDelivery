import { Outlet } from "react-router-dom";
import Sidebar from "../../shared/components/Sidebar/Sidebar";

function Home() {

  return (
    <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
      <Sidebar />
      <main className="relative h-[100vh] overflow-hidden md:ml-64 bg-blueGray-100 w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default Home;