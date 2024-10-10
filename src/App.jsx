import { useState, useEffect } from 'react'
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore'
import myDB from './config/firebaseConfig'
import InputBox from './components/InputBox/InputBox'
import FilterBox from './components/FilterBox/FilterBox'
import TableBox from './components/TableBox/TableBox'
import BalanceBox from './components/BlanaceBox/BlanaceBox'

function App() {
  const myCollection = collection(myDB, 'trade-logger-test')
  const [data, setData] = useState([])
  const [balance, setBalance] = useState({})
  const [filterData, setFilterData] = useState([])
  const [filterOn, setFilterOn] = useState(false)
  const [requestCount, setRequestCount] = useState(1)
  useEffect(() => {
    const fetchData = async () => {
      try {
        //const res = await fetch('http://localhost:5000/transactions')
        //const getData = await savedData.json()
        const rawData = await getDocs(myCollection)
        const getData = rawData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setData(getData)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [requestCount])
  useEffect(() => {
    if (filterOn) {
      calculateBalance(filterData)
    } else {
      calculateBalance(data)
    }
  }, [data, filterData, filterOn])

  function calculateBalance(data) {
    const newBalance = data.reduce((acc, row) => {
      let currentBalance = acc
      if (row.currency1 !== '') {
        if (currentBalance?.[row.currency1]) {
          currentBalance[row.currency1] =
            currentBalance[row.currency1] + Number(row.amount1)
        } else {
          currentBalance[row.currency1] = Number(row.amount1)
        }
      }
      if (row.currency2 !== '') {
        if (currentBalance?.[row.currency2]) {
          currentBalance[row.currency2] =
            currentBalance[row.currency2] - Number(row.amount2)
        } else {
          currentBalance[row.currency2] = -Number(row.amount2)
        }
      }
      return currentBalance
    }, {})
    setBalance(newBalance)
  }
  function filterBoolean(row, filterArray) {
    let typeArray = []
    if (filterArray[5]) {
      typeArray.push('Buy')
    }
    if (filterArray[6]) {
      typeArray.push('Sell')
    }
    if (filterArray[7]) {
      typeArray.push('Receive')
    }
    if (filterArray[8]) {
      typeArray.push('Withdraw')
    }
    let dateFromBool = filterArray[1] ? row.datetime >= filterArray[1] : true
    let dateToBool = filterArray[2] ? row.datetime <= filterArray[2] : true
    let currency1Bool = filterArray[3]
      ? row.currency1 === filterArray[3] || row.currency2 === filterArray[3]
      : true
    let currency2Bool = filterArray[4]
      ? row.currency1 === filterArray[4] || row.currency2 === filterArray[4]
      : true
    return (
      dateFromBool &&
      dateToBool &&
      currency1Bool &&
      currency2Bool &&
      typeArray.includes(row.type)
    )
  }
  async function addRow(row) {
    try {
      //const res = await fetch('http://localhost:5000/transactions', {
      //  method: 'POST',
      //  headers: { 'Content-Type': 'application/json' },
      //  body: JSON.stringify(row),
      //})
      //const result = await res.json()
      await setDoc(doc(myDB, 'trade-logger-test', row.id), {
        type: row.type,
        amount1: row.amount1,
        currency1: row.currency1.toString(),
        amount2: row.amount2,
        currency2: row.currency2.toString(),
        datetime: row.datetime,
      })
      setRequestCount((prevstate) => prevstate + 1)
    } catch (err) {
      console.log(err)
    }
  }
  async function deleteRow(delId) {
    try {
      //const res = await fetch(`http://localhost:5000/transactions/${delId}`, {
      //  method: 'DELETE',
      //})
      //const result = await res.json()
      await deleteDoc(doc(myDB, 'trade-logger-test', delId))
      setRequestCount((prevstate) => prevstate + 1)
    } catch (err) {
      console.log(err)
    }
    if (filterData) {
      const delFilData = filterData.filter((row) => row.id !== delId)
      setFilterData(delFilData)
    }
  }
  function filterAction(filterArray) {
    if (filterArray[0]) {
      setFilterOn(true)
      const filData = data.filter((row) => filterBoolean(row, filterArray))
      setFilterData(filData)
    } else {
      setFilterOn(false)
      setFilterData([])
    }
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <BalanceBox balance={balance} />
      </header>
      <main>
        <div className='input-container'>
          <InputBox filterOn={filterOn} handleAdd={(row) => addRow(row)} />
          <FilterBox
            balance={balance}
            handleFilter={(filter) => filterAction(filter)}
          />
        </div>
        <div className='data-container'>
          <TableBox
            data={filterOn ? filterData : data}
            handleDelete={(id) => deleteRow(id)}
          />
        </div>
      </main>
    </div>
  )
}

export default App
