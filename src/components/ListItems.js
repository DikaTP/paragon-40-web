"use client"

import { useState, useEffect } from "react"
import db from '@/utils/firebase/firestore'
import { collection, getDocs } from '@firebase/firestore'

const ListItems = () => {
  const [items, setItems] = useState([])
  
  useEffect(() => {
    const fetchItems = async() => {
      const querySnapshot = await getDocs(collection(db, 'sampe_polls'))
      setItems(
        querySnapshot.docs.map((doc) => (
          { ...doc.data(), id: doc.id}
        ))
      )
    }
    
    fetchItems()
  }, [])
  
  return (
    <div>
    <h2>List Sample Polls</h2>
    <ul>
    {items.map((item) => (
      <li key={item.id}><p>{item.name}</p></li>
    ))}
    </ul>
    </div>
  )
}

export default ListItems