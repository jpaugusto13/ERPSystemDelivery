function HeaderSidebar() {
  return (
    <div className="pt-12 relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words bg-white border shadow-2xl dark:bg-gray-800 dark:border-gray-700 md:max-w-sm">
      <div className="pb-6">
        <div className="flex flex-wrap justify-center">
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src="../../../public/imgs/logo.jpeg"
                className="dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8 absolute -m-16 -ml-18 lg:-ml-16 max-w-[150px]"
              />
            </div>
          </div>
        </div>
        <div className="mt-20 text-center">
          <div className="flex flex-row justify-center w-full mx-auto space-x-2 text-center">
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderSidebar;
