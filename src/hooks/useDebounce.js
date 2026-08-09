import { useState, useEffect } from 'react';
import { DEBOUNCE_DELAY } from '../utils/constants';

/**
 * Custom hook to debounce rapid value updates
 * @param {*} value - The input value to debounce
 * @param {number} delay - Delay in milliseconds (defaults to 500ms)
 * @returns {*} Debounced value
 */
export function useDebounce(value, delay = DEBOUNCE_DELAY) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
