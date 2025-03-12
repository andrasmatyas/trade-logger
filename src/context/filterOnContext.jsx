import { createContext, useState } from 'react'

export const FilterOnContext = createContext(null)
export const SetFilterOnContext = createContext(null)
export const FilterOnContextProvider = ({ children }) => {
  const [filterOn, setFilterOn] = useState(false)
  return (
    <FilterOnContext.Provider value={filterOn}>
      <SetFilterOnContext.Provider value={setFilterOn}>
        {children}
      </SetFilterOnContext.Provider>
    </FilterOnContext.Provider>
  )
}
