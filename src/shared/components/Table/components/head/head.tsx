import { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

function TableHead({ children }: TableProps) {
  return (
    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-base font-semibold text-gray-600 tracking-wider">
      {children}
    </th>
  );
}

function TableData({ children }: TableProps) {
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p className="text-gray-900 whitespace-no-wrap">{children}</p>
    </td>
  );
}

function TableRow({ children }: TableProps) {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  )
}

export { TableHead, TableRow, TableData };
