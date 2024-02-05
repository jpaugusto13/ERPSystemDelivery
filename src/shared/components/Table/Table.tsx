import { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

interface TableDataColorProps {
  status: string | ReactNode;
}

function TableHead({ children }: TableProps) {
  return (
    <th className="px-5 py-3 border-b-2 z-50 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0">
      {children}
    </th>
  );
}

function TableDataColor({ status }: TableDataColorProps) {
  let classColor: string;
  classColor = 'bg-green-200';

  if (status == 'concluída') {
    classColor = 'bg-green-200';
  } else if (status == 'processamento') {
    classColor = 'bg-yellow-200';
  } else if (status == 'cancelada') {
    classColor = 'bg-red-200';
  }

  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p className="text-gray-900 whitespace-no-wrap">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden
            className={`absolute inset-0 opacity-50 rounded-full ${classColor}`}
          ></span>
          <span className="relative capitalize">{status}</span>
        </span>
      </p>
    </td>
  );
}

function TableData({ children }: TableProps) {
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p className="text-gray-900 whitespace-no-wrap flex items-center gap-1">
        {children}
      </p>
    </td>
  );
}

function TableRow({ children }: TableProps) {
  return <tr>{children}</tr>;
}

function Table({ children }: TableProps) {
  return (
    <table className="min-w-full relative leading-normal rounded-xl bg-white p-3 shadow-lg hover:shadow-xl duration-300">
      {children}
    </table>
  );
}

export { Table, TableHead, TableRow, TableData, TableDataColor };
