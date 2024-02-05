import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, ...rest }, ref) => {
    const htmlFor = label?.toLowerCase().replace(' ', '');

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        className="content-field"
      >
        <input id={htmlFor} {...rest} ref={ref} />
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

export default Input;
