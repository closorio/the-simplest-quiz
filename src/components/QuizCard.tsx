import { useState, useEffect } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  onTimeOut: () => void;
  questionNumber: number;
  totalQuestions: number;
}

function QuizCard({ question, onAnswer, onTimeOut, questionNumber, totalQuestions }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30); // Temporizador de 30 segundos

  // Reiniciar el temporizador y el estado selectedAnswer cuando cambia la pregunta
  useEffect(() => {
    setTimeLeft(30); // Reiniciar el temporizador a 30 segundos
    setSelectedAnswer(null); // Reiniciar selectedAnswer a null
  }, [question]); // Dependencia: question

  // Lógica del temporizador
  useEffect(() => {
    if (timeLeft === 0) {
      onTimeOut(); // Llamar a onTimeOut si el tiempo se agota
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Limpiar el temporizador
  }, [timeLeft, onTimeOut]);

  const handleClick = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === question.correctAnswer;
    onAnswer(isCorrect);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
      <h2 className="text-xl font-bold mb-4">
        Pregunta {questionNumber} de {totalQuestions}
      </h2>
      <p className="mb-4">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleClick(option)}
            className={`w-full p-2 rounded ${
              selectedAnswer === option
                ? option === question.correctAnswer
                  ? "bg-green-500"
                  : "bg-red-500"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
            disabled={selectedAnswer !== null} // Deshabilitar botones después de seleccionar una respuesta
          >
            {option}
          </button>
        ))}
      </div>
      <p className="mt-4">Tiempo restante: {timeLeft} segundos</p>
    </div>
  );
}

export default QuizCard;