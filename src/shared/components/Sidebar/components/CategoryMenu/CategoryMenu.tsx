interface CategoryMenuProps {
  children: React.ReactNode;
}

function CategoryMenu({ children }: CategoryMenuProps) {
  return (
    <li className="px-5">
      <div className="flex flex-row items-center h-8">
        <div className="text-base font-light tracking-wide text-gray-500">
          {children}
        </div>
      </div>
    </li>
  );
}

export default CategoryMenu;
