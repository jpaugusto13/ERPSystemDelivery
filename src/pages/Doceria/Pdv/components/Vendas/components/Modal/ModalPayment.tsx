import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import Input from '../../../../../../../shared/components/Form/Input';
import { PagamentoType } from '../../../../../../../types/SaleType';

interface ModalPaymentProps {
  openModal: boolean;
  onCloseModal: () => boolean;
}

interface FormaPagamento {
  id: number;
  valor: string;
  tipo: string;
}

function ModalPayment({ openModal, onCloseModal }: ModalPaymentProps) {
  const [formasPagamento, setFormasPagamento] = useState<FormaPagamento[]>([
    { id: 1, valor: '', tipo: 'Pix' },
  ]);

  const adicionarFormaPagamento = () => {
    if (formasPagamento.length < 4) {
      const novaFormaPagamento = { id: Date.now(), valor: '', tipo: '' };
      setFormasPagamento([...formasPagamento, novaFormaPagamento]);
    }
  };

  const removerFormaPagamento = (id: number) => {
    const formasAtualizadas = formasPagamento.filter(
      (forma) => forma.id !== id,
    );
    setFormasPagamento(formasAtualizadas);
  };

  const formatarValor = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let valorNumerico = e.target.value.replace(/\D/g, '');
    valorNumerico = (Number(valorNumerico) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const formasAtualizadas = formasPagamento.map((forma) =>
      forma.id === id ? { ...forma, valor: valorNumerico } : forma,
    );

    setFormasPagamento(formasAtualizadas);
  };

  const handleChangeTipo = (id: number, tipo: string) => {
    const formasAtualizadas = formasPagamento.map((forma) =>
      forma.id === id ? { ...forma, tipo } : forma,
    );

    setFormasPagamento(formasAtualizadas);
  };

  const handleClickPreco = (
    id: number,
    e: React.MouseEvent<HTMLInputElement>,
  ) => {
    const input = e.target as HTMLInputElement;
    input.setSelectionRange(input.value.length, input.value.length);
    console.log(formasPagamento.find((forma) => forma.id === id)?.valor);
  };

  const confirmPagamento = () => {
    let pagamentoArray: Array<PagamentoType> = [];

    formasPagamento.forEach((pagamento) => {
      const valorDePagamento = pagamento.valor.replace('R$', '');
      const valorFormatado: string = valorDePagamento.replace(',', '.');

      pagamentoArray.push({
        forma_pagamento: pagamento.tipo.toLowerCase(),
        valor: Number(Number(valorFormatado).toFixed(2)),
      });
    });

    setPagamento(pagamentoArray);
    onCloseModal(false);
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={openModal}
      onClose={() => onCloseModal(false)}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Forma de pagamento
            </ModalHeader>
            <form>
              <ModalBody>
                {formasPagamento.map((forma) => (
                  <div key={forma.id} className="mb-4">
                    <div className="flex items-center mb-2">
                      <span className="mr-2">Forma de Pagamento:</span>
                      <select
                        value={forma.tipo}
                        onChange={(e) =>
                          handleChangeTipo(forma.id, e.target.value)
                        }
                        className="bg-white/20 py-2 px-4 rounded-lg focus:outline-none border-2 border-gray-300 focus:border-violet-300 transition-colors duration-300"
                      >
                        <option value="Pix">Pix</option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Credito">Crédito</option>
                        <option value="Debito">Débito</option>
                      </select>
                    </div>
                    <Input
                      className="backdrop-blur-sm bg-white/20 py-2 pl-4 pr-4 rounded-lg focus:outline-none border-2 border-gray-300 focus:border-violet-300 transition-colors duration-300"
                      label={`Preço ${forma.id}`}
                      type="text"
                      placeholder="R$"
                      value={forma.valor}
                      onChange={(e) => formatarValor(forma.id, e)}
                      onClick={(e) => handleClickPreco(forma.id, e)}
                      autoComplete="off"
                    />
                    {formasPagamento.length > 1 && (
                      <Button
                        color="danger"
                        variant="light"
                        onClick={() => removerFormaPagamento(forma.id)}
                      >
                        Remover
                      </Button>
                    )}
                  </div>
                ))}
                {formasPagamento.length < 4 && (
                  <Button color="success" onClick={adicionarFormaPagamento}>
                    Adicionar Forma de Pagamento
                  </Button>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => onCloseModal(false)}
                >
                  Cancelar
                </Button>
                <Button color="primary" onPress={confirmPagamento}>
                  Finalizar
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalPayment;
