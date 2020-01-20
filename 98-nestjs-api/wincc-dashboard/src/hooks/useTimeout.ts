import { useEffect, useRef } from 'react';

export function useTimeout(callback: Function, delay: number) {
  const savedCallback = useRef<Function>();

  // Remember the latest callback.
  useEffect(
    () => {
      savedCallback.current = callback;
    },
    [callback]
  );

  // Set up the interval.
  useEffect(
    () => {
      function tick() {
        if (savedCallback.current) {
          savedCallback.current();
        }
      }
      if (delay !== null) {
        const id = setTimeout(tick, delay);
        return () => clearTimeout(id);
      }
    },
    [delay]
  );
}
