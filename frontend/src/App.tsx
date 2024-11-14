import { useState } from 'react'
import Login from './Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path = {"/login"} Component={Login}/>
        <Route path = {"*"} Component={()=> <h1>404</h1>}/>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
