import { createContext, useState } from 'react'

export const FilteredDataContext = createContext(null)
export const SetFilteredDataContext = createContext(null)
export const FilteredDataContextProvider = ({ children }) => {
  const [filteredData, setFilteredData] = useState([])
  return (
    <FilteredDataContext.Provider value={filteredData}>
      <SetFilteredDataContext.Provider value={setFilteredData}>
        {children}
      </SetFilteredDataContext.Provider>
    </FilteredDataContext.Provider>
  )
}
