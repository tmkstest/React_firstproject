import { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import quiz from '../assets/quiz.json'
import { quizContext } from '../quizContext'

const optionKeys = ['optionA', 'optionB', 'optionC', 'optionD']

function Questions() {
  const navigate = useNavigate()
  const { user, score, setScore } = useContext(quizContext)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [timeRemaining, setTimeRemaining] = useState(10)

  const question = quiz[currentQuestion]
  const isLastQuestion = currentQuestion === quiz.length - 1
  const isMultipleChoice = question.type === 'multiple'
  const progress = ((currentQuestion + 1) / quiz.length) * 100
  const timeExpired = timeRemaining === 0

  useEffect(() => {
    if (!user || timeExpired) return undefined

    const countdown = window.setTimeout(() => {
      setTimeRemaining((seconds) => Math.max(seconds - 1, 0))
    }, 1000)

    return () => window.clearTimeout(countdown)
  }, [currentQuestion, timeExpired, timeRemaining, user])

  if (!user) return <Navigate to="/" replace />

  function selectOption(key) {
    if (timeExpired) return

    if (!isMultipleChoice) {
      setSelectedOptions([key])
      return
    }

    setSelectedOptions((currentSelections) => (
      currentSelections.includes(key)
        ? currentSelections.filter((selection) => selection !== key)
        : [...currentSelections, key]
    ))
  }

  function hasCorrectAnswer() {
    if (!isMultipleChoice) return selectedOptions[0] === question.answer

    return selectedOptions.length === question.answers.length
      && question.answers.every((answer) => selectedOptions.includes(answer))
  }

  function continueQuiz() {
    if (!selectedOptions.length && !timeExpired) return

    const earnedPoint = selectedOptions.length && hasCorrectAnswer() ? 1 : 0

    if (isLastQuestion) {
      setScore(score + earnedPoint)
      navigate('/result')
      return
    }

    setScore(score + earnedPoint)
    setCurrentQuestion((index) => index + 1)
    setSelectedOptions([])
    setTimeRemaining(10)
  }

  return (
    <section className="quiz-card" aria-labelledby="question-title">
      <div className="quiz-topline">
        <span>Question {currentQuestion + 1} of {quiz.length}</span>
        <span className={`question-timer${timeRemaining <= 3 ? ' timer-warning' : ''}${timeExpired ? ' timer-expired' : ''}`}>
          <span aria-hidden="true">◷</span> {timeRemaining}s
        </span>
      </div>
      <div className="progress-track" aria-hidden="true">
        <div className="progress-value" style={{ width: `${progress}%` }} />
      </div>

      <div className="question-content">
        <p className="eyebrow">{isMultipleChoice ? 'Select all that apply' : 'Choose one answer'}</p>
        <h1 id="question-title">{question.prompt}</h1>
        <div className="answer-list" role={isMultipleChoice ? 'group' : 'radiogroup'} aria-label="Answer choices">
          {optionKeys.map((key, index) => {
            const isSelected = selectedOptions.includes(key)
            return (
              <label
                key={key}
                className={`answer-option${isSelected ? ' selected' : ''}`}
                htmlFor={`${currentQuestion}-${key}`}
              >
                <input
                  id={`${currentQuestion}-${key}`}
                  className="answer-control"
                  type={isMultipleChoice ? 'checkbox' : 'radio'}
                  name={`question-${currentQuestion}`}
                  checked={isSelected}
                  onChange={() => selectOption(key)}
                  disabled={timeExpired}
                />
                <span className="option-letter" aria-hidden="true">{String.fromCharCode(65 + index)}</span>
                <span>{question[key]}</span>
              </label>
            )
          })}
        </div>
      </div>

      <div className="quiz-actions">
        <p>
          {timeExpired
            ? selectedOptions.length
              ? 'Time is up. Your selected answer will be scored.'
              : 'Time is up. This question will be recorded as incorrect.'
            : selectedOptions.length
            ? `${selectedOptions.length} answer${selectedOptions.length > 1 ? 's' : ''} selected`
            : `Select ${isMultipleChoice ? 'one or more answers' : 'an answer'} to continue`}
        </p>
        <button className="primary-button" type="button" onClick={continueQuiz} disabled={!selectedOptions.length && !timeExpired}>
          {isLastQuestion ? 'See results' : timeExpired ? 'Continue' : 'Next question'} <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}

export default Questions
