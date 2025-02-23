import { useState, useEffect } from "react";
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
  const [scores, setScores] = useState<{ name: string; score: number }[]>([]);

  // Obtener la URL base de la API desde las variables de entorno
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/getScores`);
        if (!response.ok) {
          throw new Error("Error al obtener los puntajes");
        }
        const data = await response.json();
        setScores(data);
      } catch (error) {
        console.error("Error al obtener los puntajes:", error);
      }
    };

    fetchScores();
  }, [API_BASE_URL]);

  const saveScore = async (name: string, score: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/saveScore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, score }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el puntaje");
      }

      const data = await response.json();
      console.log(data.message);

      // Actualizar la lista de puntajes
      const updatedScores = await fetch(`${API_BASE_URL}/api/getScores`).then((res) => res.json());
      setScores(updatedScores);

      // Reiniciar el quiz
      handleQuizRestart();
    } catch (error) {
      console.error("Error al guardar el puntaje:", error);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setGlobalScore(globalScore + 1);
    }
    setUserAnswers([...userAnswers, isCorrect]);

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleTimeOut = () => {
    setGlobalScore(globalScore - 1);
    setUserAnswers([...userAnswers, false]);

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleQuizRestart = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setGlobalScore(0);
    setShowResults(false);
    setUserAnswers([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen body-bg">
      {!quizStarted ? (
        <StartScreen onStart={startQuiz} scores={scores} />
      ) : showResults ? (
        <Results
          score={globalScore}
          totalQuestions={quizData.length}
          userAnswers={userAnswers}
          onSaveScore={(name) => saveScore(name, globalScore)}
        />
      ) : (
        <QuizCard
          question={quizData[currentQuestion]}
          onAnswer={handleAnswer}
          onTimeOut={handleTimeOut}
          questionNumber={currentQuestion + 1}
          totalQuestions={quizData.length}
        />
      )}
    </div>
  );
}

export default QuizApp;