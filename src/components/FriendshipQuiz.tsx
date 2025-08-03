"use client";

import { useState } from 'react';

const quizQuestions = [
  {
    questionText: 'What is my third favorite shape of pasta?',
    answerOptions: [
      { answerText: 'Farfalle', isCorrect: false },
      { answerText: 'Penne', isCorrect: false },
      { answerText: 'The one I stole from your plate', isCorrect: false },
      { answerText: 'Fusilli', isCorrect: false },
    ],
  },
  {
    questionText: 'In the event of a zombie apocalypse, what is my primary weakness?',
    answerOptions: [
      { answerText: 'Slow runners', isCorrect: false },
      { answerText: 'A sudden craving for tacos', isCorrect: false },
      { answerText: 'Lack of cardio', isCorrect: false },
      { answerText: 'Zombies', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the unspoken rule of our friendship?',
    answerOptions: [
      { answerText: 'Never bring up the "Custard Incident"', isCorrect: false },
      { answerText: 'Always be honest', isCorrect: false },
      { answerText: 'Support each other no matter what', isCorrect: false },
      { answerText: 'Reply to texts within 48 hours', isCorrect: false },
    ],
  },
  {
    questionText: 'If my personality were a cheese, which would it be?',
    answerOptions: [
      { answerText: 'Sharp Cheddar', isCorrect: false },
      { answerText: 'Smoked Gouda', isCorrect: false },
      { answerText: 'String Cheese', isCorrect: false },
      { answerText: 'Gorgonzola', isCorrect: false },
    ],
  },
  {
    questionText: 'What was the exact decibel level of my sneeze last Tuesday?',
    answerOptions: [
      { answerText: '110 dB (a jet engine)', isCorrect: false },
      { answerText: '85 dB (a blender)', isCorrect: false },
      { answerText: 'A polite 60 dB', isCorrect: false },
      { answerText: 'The sound of silence', isCorrect: false },
    ],
  },
];

export default function FriendshipQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  
  const handleAnswerClick = () => {
    // It doesn't matter what they click, move to the next question
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="mt-8 w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">The (Impossible) Friendship Test</h2>
      {showScore ? (
        <div>
          <p className="text-lg text-gray-700">You scored 0 out of {quizQuestions.length}.</p>
          <p className="mt-4 text-xl font-bold text-red-600">Congrats, you’re legally not my friend anymore. 😂</p>
        </div>
      ) : (
        <div>
          <div className="mb-4 text-lg text-gray-800">
            {quizQuestions[currentQuestion].questionText}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {quizQuestions[currentQuestion].answerOptions.map((option, index) => (
              <button key={index} onClick={handleAnswerClick} className="rounded-lg bg-indigo-100 p-4 text-gray-800 transition hover:bg-indigo-200">
                {option.answerText}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}