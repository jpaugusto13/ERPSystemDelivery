import VendaPdv from './components/Vendas/VendaPdv';

function Pdv() {
  return (
    <div className="w-full">
      <nav className="flex relative z-30 justify-around h-[8vh] items-center shadow-md bg-gray-800 text-white w-full">
        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
          <p className="text-3xl font-bold font-heading">Ponto de venda</p>
        </div>
      </nav>
      <div className="w-full h-[92vh]">
        <VendaPdv />
      </div>
    </div>
  );
}

export default Pdv;