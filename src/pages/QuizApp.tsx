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

  useEffect(() => {
    fetch("/api/getScores")
      .then((response) => response.json())
      .then((data) => setScores(data))
      .catch((error) => console.error("Error al obtener los puntajes:", error));
  }, []);

  const saveScore = async (name: string, score: number) => {
    try {
      const response = await fetch("/api/saveScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, score }),
      });
      const data = await response.json();
      console.log(data.message);

      // Actualizar la lista de puntajes
      const updatedScores = await fetch("/api/getScores").then((res) => res.json());
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