import {
  Table,
  TableRow,
  TableHead,
  TableData,
  TableDataColor,
} from '../../../../../shared/components/Table/Table';
import { NumericFormat } from 'react-number-format';

import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PixIcon from '@mui/icons-material/Pix';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { getSales } from '../../../../../data/sales';
import { useQuery } from '@tanstack/react-query';

function SaleTable() {
  const { data: sales } = useQuery({
    queryKey: ['salesDay'],
    queryFn: () => getSales({status_venda: "concluída", data_venda: `${year}-${month}-${day}`}),
  })

  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const getPaymentIcon = (paymentMethod: string) => {
    switch (paymentMethod) {
      case 'pix':
        return <PixIcon />;
      case 'debito' || 'credito':
        return <CreditCardIcon />;
      default:
        return <LocalAtmIcon />;
    }
  };

  return (
    <Table>
      <TableRow>
        <TableHead>#</TableHead>
        <TableHead>Forma de pagamento</TableHead>
        <TableHead>Valor</TableHead>
        <TableHead>Status da venda</TableHead>
        <TableHead>Hora</TableHead>
      </TableRow>
      {sales && sales.length > 0 ? (
        sales?.map(({ pagamento, status_venda, hora_venda }, index) => {
          const totalValorVenda = pagamento?.reduce(
            (acumulador, { valor }) => acumulador + valor,
            0,
          );

          return (
            <TableRow>
              <TableData>{sales?.length - index}</TableData>
              <TableData>
                {pagamento?.map(({ forma_pagamento }, index) => {
                  if (index == 0)
                    return (
                      <span className="flex capitalize gap-1 items-center">
                        {getPaymentIcon(forma_pagamento)}
                        {pagamento.length > 1 ? 'Mista' : forma_pagamento}
                      </span>
                    );
                })}
              </TableData>
              <TableData>
                {
                  <NumericFormat
                    value={totalValorVenda}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    prefix={'R$ '}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                }
              </TableData>
              <TableDataColor status={status_venda} />
              <TableData>{hora_venda?.substring(0, 5)} {Number(hora_venda?.substring(0, 2)) < 12 ? "AM" : "PM"}</TableData>
            </TableRow>
          );
        })
      ) : (
        <TableRow>
          <TableData> </TableData>
          <TableData> </TableData>
          <TableData>
            Nenhuma venda registrada no dia {`${day}/${month}/${year}`}
          </TableData>
          <TableData> </TableData>
          <TableData> </TableData>
        </TableRow>
      )}
    </Table>
  );
}

export default SaleTable;
