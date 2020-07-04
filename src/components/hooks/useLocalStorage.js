import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue = '') {
  const [value, setValue] = useState(() => window.localStorage.getItem(key) || initialValue)

  function handleChange(e) {
    setValue(e.target.value)
  }

  useEffect(() => {
    window.localStorage.setItem(key, value) // persistence 😀
  }, [value, key])

  return {
    value,
    onChange: handleChange
  }
}