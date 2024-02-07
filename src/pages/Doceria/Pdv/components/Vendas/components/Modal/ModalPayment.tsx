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
import { PaymentType } from '../../../../../../../types/SaleType';

interface ModalPaymentProps {
  openModal: boolean;
  onCloseModal: () => boolean;
}

function ModalPayment({ openModal, onCloseModal }: ModalPaymentProps) {
  const [ payment, setPayment ] = useState<PaymentType[]>([{ valor: 0, forma_pagamento: 'pix' }]);

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
