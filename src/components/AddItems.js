import { useState } from "react";
import db from "../utils/firebase/firestore"
import {collection, addDoc } from '@firebase/firestore'

const AddItem = () => {
  const [value, setValue] = useState('')
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      const docRef = await addDoc(collection(db, 'sampe_polls'), {
        name: value
      })
      console.log('docRef: ', docRef.id)
      setValue('')
    } catch (error) {
      console.log('err add poll: ', error)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="my-4">
    <input
    type="text"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Add poll"
    className="border p-2 rounded-lg mr-4"
    />
    <button type="submit">Add poll</button>
    </form>
  )
}

export default AddItem