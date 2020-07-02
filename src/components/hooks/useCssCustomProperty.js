import { useState, useEffect } from 'react';

export function useCssCustomProperty(cssVar, initialValue = '#ffffff') {
  const [value, setValue] = useState(initialValue)

  function handleChange(e) {
    setValue(e.target.value)
  }

  useEffect(() => {
    document.documentElement.style.setProperty(cssVar, value)
  }, [value, cssVar])

  return {
    value,
    onChange: handleChange
  }
}