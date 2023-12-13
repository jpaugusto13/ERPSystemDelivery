import React from "react";
import { Link } from "react-router-dom";

interface MenuProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  route: string
}

function ItemMenu({ children, icon, route }: MenuProps) {
  return (
    <li>
      <Link to={route} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
        <span className="inline-flex justify-center items-center ml-4">
          {icon}
        </span>
        <span className="ml-2 text-base tracking-wide truncate">{children}</span>
      </Link>
  </li>
  );
}

export default ItemMenu;
