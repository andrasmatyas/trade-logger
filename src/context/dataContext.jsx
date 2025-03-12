import { doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore'
import { myDB, myCollection } from '../config/firebaseConfig'
import { createContext, useCallback, useEffect, useState } from 'react'

export const dataContext = createContext(null)
export const dataActionsContext = createContext(null)

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([])
  const fetchData = useCallback(async () => {
    try {
      const rawData = await getDocs(myCollection)
      const dataWithId = rawData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setData(dataWithId)
    } catch (err) {
      console.log(err)
    }
  }, [])
  const addRow = useCallback(
    async (row) => {
      try {
        await setDoc(doc(myDB, 'trade-logger', row.id), {
          type: row.type,
          amount1: row.amount1,
          currency1: row.currency1.toString(),
          amount2: row.amount2,
          currency2: row.currency2.toString(),
          datetime: row.datetime,
        })
        fetchData()
      } catch (err) {
        console.log(err)
      }
    },
    [fetchData]
  )
  const deleteRow = useCallback(
    async (delId) => {
      try {
        await deleteDoc(doc(myDB, 'trade-logger', delId))
        fetchData()
      } catch (err) {
        console.log(err)
      }
    },
    [fetchData]
  )
  useEffect(() => {
    fetchData()
  }, [fetchData])
  return (
    <dataContext.Provider value={data}>
      <dataActionsContext.Provider value={{ fetchData, addRow, deleteRow }}>
        {children}
      </dataActionsContext.Provider>
    </dataContext.Provider>
  )
}
