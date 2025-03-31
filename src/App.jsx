import { useState } from 'react'
import './App.css'
import InteractiveBanner from './InterActiveBanner'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex justify-center dark items-center min-h-screen bg-gray-200">
    <InteractiveBanner />
  </div>
  )
}

export default App
