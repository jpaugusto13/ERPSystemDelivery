import React from 'react';

interface MenuProps {
  children: React.ReactNode;
}

function Menu({ children }: MenuProps) {
  return <ul className="flex flex-col">{children}</ul>;
}

export default Menu;
