import { ReactNode } from 'react';

interface ButtonPdvProps {
  className: string;
  icon: ReactNode;
  children: string;
  onClick: () => void;
}

export default function ButtonPdv({
  className,
  icon,
  children,
  onClick,
}: ButtonPdvProps) {
  return (
    <button onClick={onClick} className={className}>
      <div>
        {icon}
        <p className="text-lg font-bold text-fuchsia-50">{children}</p>
      </div>
    </button>
  );
}
