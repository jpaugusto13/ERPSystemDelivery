import React from "react";

interface MenuProps {
  children: React.ReactNode;
}

function Menu({ children }: MenuProps) {
  return (
    <ul className="flex flex-col py-4 space-y-1">{children}</ul>
  );
}

export default Menu;