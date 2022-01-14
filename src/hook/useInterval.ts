import { useEffect, useRef } from "react";

/**
 * The callback is launched every [delay] millieconds
 * @param callback
 * @param delay in milliseconds (default 1000)
 */
export default function useInterval(callback: Function, delay: number = 1000): void {
  const refCallback = useRef<Function>();

  useEffect(() => {
    refCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const idInterval = setInterval(tick, delay);
    return () => clearInterval(idInterval);
  }, [delay]);

  const tick = () => refCallback.current && refCallback.current();
}
