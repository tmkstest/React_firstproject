import React, { useContext, useState } from 'react'
import quiz from '../assets/quiz.json'
import { quizContext } from '../App';

function Questions() {
  const { score, setScore } = useContext(quizContext);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChoosen, setOptionChoosen] = useState("");

  function next() {
    setCurrentQuestion(currentQuestion + 1);
    console.log(optionChoosen);
    
  }

  function finish() {

  }
  return (
    <div>
      <h1>{quiz[currentQuestion].prompt}</h1>
      <button onClick={() => setOptionChoosen("optionA")}>{quiz[currentQuestion].optionA}</button>
      <button onClick={() => setOptionChoosen("optionB")}>{quiz[currentQuestion].optionB}</button>
      <button onClick={() => setOptionChoosen("optionC")}>{quiz[currentQuestion].optionC}</button>
      <button onClick={() => setOptionChoosen("optionD")}>{quiz[currentQuestion].optionD}</button>
      {
        currentQuestion == quiz.length - 1 ? <button onClick={finish}>Finish</button> : <button onClick={next}>Next</button>
      }

    </div>
  )
}

export default Questions