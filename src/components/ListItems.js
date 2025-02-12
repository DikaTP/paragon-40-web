"use client"

import { useState, useEffect } from "react"
import { getPollByRegion } from '@/utils/firebase/firestoreHelper';

const ListItems = () => {
  const [items, setItems] = useState([])
  
  useEffect(() => {
    const fetchItems = async() => {
      const polls = await getPollByRegion('jakarta')
      setItems(polls)
    }
    
    fetchItems()
  }, [])
  
  return (
    <div>
    <h2>List Sample Polls</h2>
    <ul>
    {items.map((item) => (
      <li key={item.id}><p>{item.title.en}</p></li>
    ))}
    </ul>
    </div>
  )
}

export default ListItems