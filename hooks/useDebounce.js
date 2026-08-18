import { useState, useEffect } from "react";

/**
 * Custom hook that debounces a value by a specified delay in milliseconds.
 *
 * @param {any} value
 * @param {number} delay
 * @returns {any} Debounced value
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
