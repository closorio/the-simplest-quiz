import { useState } from "react";
import quizData from "../data/quiz.json";
import QuizCard from "../components/QuizCard";
import Results from "../components/Results";
import StartScreen from "../components/StartQuiz";

function QuizApp() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [globalScore, setGlobalScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setGlobalScore(globalScore + 1); // Incrementar puntaje si la respuesta es correcta
    }
    setUserAnswers([...userAnswers, isCorrect]);

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1); // Avanzar a la siguiente pregunta
    } else {
      setShowResults(true); // Mostrar resultados si no hay más preguntas
    }
  };

  const handleTimeOut = () => {
    setGlobalScore(globalScore - 1); // Descontar 1 punto si el tiempo se agota
    setUserAnswers([...userAnswers, false]); // Registrar la respuesta como incorrecta

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1); // Avanzar a la siguiente pregunta
    } else {
      setShowResults(true); // Mostrar resultados si no hay más preguntas
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!quizStarted ? (
        <StartScreen onStart={startQuiz} />
      ) : showResults ? (
        <Results score={globalScore} totalQuestions={quizData.length} userAnswers={userAnswers} />
      ) : (
        <QuizCard
          question={quizData[currentQuestion]}
          onAnswer={handleAnswer}
          onTimeOut={handleTimeOut} // Pasar función para manejar el tiempo agotado
          questionNumber={currentQuestion + 1}
          totalQuestions={quizData.length}
        />
      )}
    </div>
  );
}

export default QuizApp;