import { useEffect, useState } from 'react';

interface NumberCounterProps {
  start: number;
  end: number;
  duration: number;
}

export function NumberCounter({ start, end, duration }: NumberCounterProps) {
  const [current, setCurrent] = useState<number | undefined>(undefined);

  useEffect(() => {
    const increment = Math.ceil((end - start) / (duration / 16));
    const interval = setInterval(() => {
      setCurrent((prevCurrent) => {
        const newCurrent =
          prevCurrent !== undefined ? prevCurrent + increment : start;
        return newCurrent >= end ? end : newCurrent;
      });
    }, 16);

    return () => {
      clearInterval(interval);
    };
  }, [start, end, duration]);
  return (
    <span>{current !== undefined ? current : ''}</span>
  );
}