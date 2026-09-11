import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import quiz from '../assets/quiz.json'
import { quizContext } from '../quizContext'

const flowers = Array.from({ length: 22 }, (_, index) => ({
  delay: `${(index % 7) * 0.32}s`,
  left: `${(index * 17 + 4) % 96}%`,
  size: `${18 + (index % 4) * 4}px`,
}))

function getMessage(score) {
  if (score >= 5) return 'Wow, very good!'
  if (score >= 3) return 'Good!'
  return 'Better luck next time!'
}

function Result() {
  const navigate = useNavigate()
  const { user, setUser, score, setScore } = useContext(quizContext)

  if (!user) return <Navigate to="/" replace />

  const percentage = Math.round((score / quiz.length) * 100)

  function retry() {
    setScore(0)
    navigate('/questions')
  }

  function goHome() {
    setScore(0)
    setUser('')
    navigate('/')
  }

  return (
    <section className="result-card" aria-labelledby="result-title">
      {score >= 5 && (
        <div className="flower-shower" aria-hidden="true">
          {flowers.map((flower, index) => (
            <span
              key={index}
              style={{
                '--delay': flower.delay,
                '--left': flower.left,
                '--size': flower.size,
              }}
            >
              ✿
            </span>
          ))}
        </div>
      )}
      <div className="result-icon" aria-hidden="true">★</div>
      <p className="eyebrow">Quiz complete</p>
      <h1 id="result-title">Great effort, {user}!</h1>
      <p className="result-message">{getMessage(score)}</p>

      <div className="score-panel" aria-label={`Your score is ${score} out of ${quiz.length}`}>
        <span className="score-number">{score}<small>/{quiz.length}</small></span>
        <span className="score-label">correct answers</span>
        <span className="score-percent">{percentage}%</span>
      </div>

      <div className="result-actions">
        <button className="primary-button" type="button" onClick={retry}>Try again <span aria-hidden="true">↻</span></button>
        <button className="text-button" type="button" onClick={goHome}>Use another name</button>
      </div>
    </section>
  )
}

export default Result
