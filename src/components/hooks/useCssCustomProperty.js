import { useState, useEffect } from 'react';

export function useCssCustomProperty(cssVar, initialValue = '') {
  const [value, setValue] = useState(() => window.localStorage.getItem(cssVar) || initialValue)

  function handleChange(e) {
    setValue(e.target.value)
  }

  useEffect(() => {
    document.documentElement.style.setProperty(cssVar, value)
    window.localStorage.setItem(cssVar, value) // persistence 😀
  }, [value, cssVar])

  return {
    value,
    onChange: handleChange
  }
}