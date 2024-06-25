import { useState } from 'react'
import './App.css'
import KanbanBoard from './components/KanbanBoard'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
     <KanbanBoard />
    </>
  )
}

export default App
