'use client'
import React, { useState, useEffect } from "react"
import { collection, doc, addDoc, getDoc, query, querySnapshot, onSnapshot, deleteDoc } from "firebase/firestore"; 
import { db } from './firebase'

export default function Home() {
  const [ items, setItems ] = useState([
    { name: "Coffee", price: 4.95 },
    { name: "Movie", price: 24.95 },
    { name: "Candy", price: 2.95 }
  ])
  const [ newItem, setNewItem ] = useState({
    name: "", 
    price: ""
  })
  const [ total, setTotal ] = useState(0)

  // Add Item to Database
  const addItem = async (e) => {
    e.preventDefault()
    if (newItem.name !== "" && newItem.price !== "") {
      //setItems{[...items, newItem]}
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({ name: "", price: "" })
    }
  }

  // Read Items from Database
  useEffect(() => {
    const q = query(collection(db, "items"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = []

      querySnapshot.forEach(doc => {
        itemsArr.push({...doc.data(), id: doc.id})
      })
      setItems(itemsArr)
    
      // Read total from itemsArray
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce((sum, item) => sum + parseFloat(item.price), 0)
        setTotal(totalPrice)
      }
      calculateTotal()

      // Cleanup
      return () => unsubscribe()
    })
  }, [])

  // Delete Items from Database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Geanu's Expensify App</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input 
              value={newItem.name}
              onChange={e => setNewItem({...newItem, name: e.target.value})}
              type="text" 
              className="col-span-3 p-3 border" 
              placeholder="Enter Item" 
            />
            <input 
              value={newItem.price}
              onChange={e => setNewItem({...newItem, price: e.target.value})}
              type="number" 
              className="col-span-2 p-3 border mx-3" 
              placeholder="Enter $" 
            />
            <button 
              onClick={addItem}
              type="submit" 
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl">
            +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li key={id} className="my-4 w-full flex justify-between bg-slate-950">
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span className="">$ {item.price}</span>
                </div>
                <button 
                  onClick={() => deleteItem(item.id)}
                  className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
 
                >
                    X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? ("") : (
            <div className="flex justify-between p-3">
              <span>Total</span>
              <span>$ {total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
