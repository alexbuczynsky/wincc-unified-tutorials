import { useEffect, useRef } from 'react';

/**
 *
 *
 * @export
 * @param {Function} callback
 * @param {number} delay
 * @param {ReadonlyArray<any>} [deps=[]]
 */
export function useInterval(callback: Function, delay: number, deps: ReadonlyArray<any> = []) {
  const savedCallback = useRef<Function>(() => 0);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay) {
      tick();
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [...deps, delay]);
}
export default useInterval;
