import { useState, useEffect } from "react";
import FlipMove from "react-flip-move";

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
  const [timeLeft, setTimeLeft] = useState(15); // Temporizador de 15 segundos
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  // Función para permutar las opciones
  const shuffleOptions = (options: string[]) => {
    return options
      .map((option) => ({ option, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ option }) => option);
  };

  // Reiniciar el temporizador, el estado selectedAnswer y permutar las opciones cuando cambia la pregunta
  useEffect(() => {
    setTimeLeft(30); // Reiniciar el temporizador a 30 segundos
    setSelectedAnswer(null); // Reiniciar selectedAnswer a null
    setShuffledOptions(shuffleOptions(question.options)); // Permutar las opciones
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

  // Permutar las opciones cada 500 ms
  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      setShuffledOptions(shuffleOptions(question.options));
    }, 700);

    return () => clearInterval(shuffleInterval); // Limpiar el intervalo
  }, [question.options]);

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
      <FlipMove className="space-y-2">
        {shuffledOptions.map((option) => (
          <button
            key={option} // Usar la opción como clave para asegurar la consistencia
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
      </FlipMove>
      <p className="mt-4">Tiempo restante: {timeLeft} segundos</p>
    </div>
  );
}

export default QuizCard;