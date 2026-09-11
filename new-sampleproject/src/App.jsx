import { useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Questions from './compoents/Questions'
import Result from './compoents/Result'
import User from './compoents/User'
import { quizContext } from './quizContext'
import ApiCalling from './compoents/ApiCalling'

function App() {
  const [user, setUser] = useState('')
  const [score, setScore] = useState(0)

  const contextValue = useMemo(
    () => ({ user, setUser, score, setScore }),
    [user, score],
  )

  return (
    <BrowserRouter>
      <quizContext.Provider value={contextValue}>
        {/* <main className="app-shell"> */}
          {/* <header className="site-header">
             <span className="brand-mark" aria-hidden="true">Q</span>
            <span className="brand-name">QuickQuiz</span> 
          </header> */}
          <Routes>
            <Route path="/" element={<ApiCalling/>} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/result" element={<Result />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        {/* </main> */}
      </quizContext.Provider>
    </BrowserRouter>
  )
}

export default App
