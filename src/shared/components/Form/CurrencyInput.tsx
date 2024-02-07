import { InputHTMLAttributes, forwardRef, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const CurrencyInput = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, ...rest }, ref) => {
    const htmlFor = label?.toLowerCase().replace(' ', '');
    
    const [valor, setValor] = useState('');

    const formatarValor = (e: React.ChangeEvent<HTMLInputElement>) => {
      let valorNumerico = e.target.value.replace(/\D/g, '');
      valorNumerico = (Number(valorNumerico) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      setValor(valorNumerico);
    };

    const handleClickPreco = (e: React.MouseEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement;
      input.setSelectionRange(input.value.length, input.value.length);
    };

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        className="content-field"
      >
        <input 
          type="text"
          placeholder="$"
          value={valor}
          onChange={formatarValor}
          onClick={handleClickPreco} 
          id={htmlFor} 
          {...rest} 
          ref={ref} 
          />
        <div
          style={!error ? { height: '0px' } : {}}
          className={error ? 'content-field-error' : ''}
        >
          {error && <p>{error}</p>}
        </div>
      </div>
    );
  },
);

export default CurrencyInput;
