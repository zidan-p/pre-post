import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Frontend for Pre Post View</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Created in Vite
      </p>
      <p className="read-the-docs">
        Coming soon....
      </p>
    </>
  )
}

export default App
