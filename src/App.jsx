import { DataContextProvider } from './context/dataContext'
import { FilteredDataContextProvider } from './context/filteredDataContext'
import { FilterOnContextProvider } from './context/filterOnContext'
import InputBox from './components/InputBox/InputBox'
import FilterBox from './components/FilterBox/FilterBox'
import TableBox from './components/TableBox/TableBox'
import BalanceBox from './components/BalanaceBox/BalanaceBox'

function App() {
  return (
    <div className='App'>
      <DataContextProvider>
        <FilteredDataContextProvider>
          <FilterOnContextProvider>
            <header className='App-header'>
              <BalanceBox />
            </header>
            <main>
              <div className='input-container'>
                <InputBox />
                <FilterBox />
              </div>
              <div className='data-container'>
                <TableBox />
              </div>
            </main>
          </FilterOnContextProvider>
        </FilteredDataContextProvider>
      </DataContextProvider>
    </div>
  )
}

export default App
