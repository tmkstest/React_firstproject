import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import quiz from '../assets/quiz.json'
import { quizContext } from '../quizContext'

function User() {
  const navigate = useNavigate()
  const { user, setUser, setScore } = useContext(quizContext)
  const [error, setError] = useState('')

  function start(event) {
    event.preventDefault()
    const name = user.trim()

    if (!name) {
      setError('Please enter your name to begin.')
      return
    }

    setUser(name)
    setScore(0)
    navigate('/questions')
  }

  return (
    <section className="welcome-card" aria-labelledby="welcome-title">
      <div className="eyebrow">Frontend fundamentals</div>
      <h1 id="welcome-title">Ready to test your web skills?</h1>
      <p className="intro-copy">
        Take five quick questions on HTML, CSS, and JavaScript. You will see your score at the end.
      </p>

      <form className="name-form" onSubmit={start} noValidate>
        <label htmlFor="username">What should we call you?</label>
        <input
          id="username"
          type="text"
          value={user}
          onChange={(event) => {
            setUser(event.target.value)
            if (error) setError('')
          }}
          placeholder="Enter your name"
          autoComplete="name"
          aria-describedby={error ? 'name-error' : undefined}
          aria-invalid={Boolean(error)}
          autoFocus
        />
        {error && <p id="name-error" className="form-error" role="alert">{error}</p>}
        <button className="primary-button" type="submit">Start quiz <span aria-hidden="true">→</span></button>
      </form>

      <div className="quiz-meta" aria-label="Quiz details">
        <span>{quiz.length} questions</span>
        <span>•</span>
        <span>No time limit</span>
      </div>
    </section>
  )
}

export default User
