import { useState } from 'react';

export default function useLocalStorage(key:string, initialValue:any) {
  const [storedValue, setStoredValue] = useState(JSON.parse(
    localStorage.getItem(key) || '[]',
  ) || initialValue);

  const setValue = (value:any) => {
    localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  const clearValue = () => {
    localStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  return [storedValue, setValue, clearValue];
}
