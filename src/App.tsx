import React, { useState } from 'react';
import QuestionCard from './components/QuestionCardComponent';
import {fetchQUizQuestions, Difficulty, QuestionState} from './API';

const TOTAL_QUESTIONS = 3;

export type AnswerObject = {
  question: string,
  answer:string,
  correct: boolean,
  correctAnswer:string
}

const App = () => {
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const nextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {

    const nextQuestionNo = number + 1;
    if(nextQuestionNo === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestionNo);
    }
  }

  const start = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQUizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value;
    const correct = questions[number].correct_answer === answer;
    if(correct) setScore(prev => prev+1);

    const answerObject = {
      question: questions[number].question,
      correct,
      answer,
      correctAnswer: questions[number].correct_answer
    }

    setUserAnswers(prev => [...prev, answerObject]);

  }

  return (
    <div>
      <h1>React Quiz</h1> 
      {( (gameOver || userAnswers.length === TOTAL_QUESTIONS) && <button onClick={start} className='start'>Start Quiz</button>)}

      {!gameOver && <p className='score'>Score:</p>}
      {loading && <p>Loading Questions...</p>}

      {!loading && !gameOver && (<QuestionCard
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number] && questions[number].question}
        answers={questions[number] && questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback = {checkAnswer}
      />)}

     {!gameOver && !loading && userAnswers.length - 1 === number && number !== TOTAL_QUESTIONS -1 &&<button onClick={nextQuestion} className='next'>Next Question</button>}

    </div>
  );
}

export default App;
