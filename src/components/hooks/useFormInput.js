import { useState } from "react"

export const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  function handleChange(e) {
    setValue(e.target.value)
  }

  return {
    value,
    onChange: handleChange
  }
}




/**
 * import { useState, useCallback, createContext } from 'react'
export const useSectionOneData = () => {
  const [sectionOneDataState, setSectionOneDataState] = useState({
    isValid: false,
  })

  const setSectionOneData = useCallback(
    (newData) => {
      const currentStateObject = { ...sectionOneDataState, ...newData }
      console.log(currentStateObject)

      // do validation here with a function that checks the whole current state object.
      const postValidationIsValid = false

      setSectionOneDataState({
        ...currentStateObject,
        isValid: postValidationIsValid,
      })
    },
    [sectionOneDataState]
  )

  return {
    sectionOneData: sectionOneDataState,
    setSectionOneData,
  }
}

export default createContext({
  sectionOneData: [],
  setSectionOneData: () => {},
})

 */