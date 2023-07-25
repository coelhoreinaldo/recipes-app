import { useState } from 'react';

export default function useLocalStorage(key:string, initialValue:any) {
  const [storedValue, setStoredValue] = useState(JSON.parse(
    localStorage.getItem(key) || JSON.stringify(initialValue),
  ));

  const setValue = (value:any) => {
    localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  return [storedValue, setValue];
}
