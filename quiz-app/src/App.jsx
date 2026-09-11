import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import User from './components/User'
import Questions from './components/Questions'
import Result from './components/Result'
import { createContext, useState } from 'react'
import ApiCalling from './components/ApiCalling'


export const quizContext = createContext();
function App() {
  const [user, setUser] = useState("");
  const [score, setScore] = useState(0);

  return (
    <div>
      <BrowserRouter>
       <quizContext.Provider value={{ user, setUser, score, setScore }}>
        <Routes>
            <Route path='/' element={<User />} />
            <Route path='/questions' element={<Questions />} />
            <Route path='/result' element={<Result />} /> 
        </Routes>
        </quizContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
