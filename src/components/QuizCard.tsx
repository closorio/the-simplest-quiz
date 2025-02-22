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

function QuizCard({
  question,
  onAnswer,
  onTimeOut,
  questionNumber,
  totalQuestions,
}: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(10); // Temporizador de 10 segundos
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [disableAnimations, setDisableAnimations] = useState(false); // Controlar animaciones
  const [isPaused, setIsPaused] = useState(false); // Estado para controlar la pausa

  // Función para permutar las opciones
  const shuffleOptions = (options: string[]) => {
    return options
      .map((option) => ({ option, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ option }) => option);
  };

  // Reiniciar el temporizador, el estado selectedAnswer y permutar las opciones al cambiar la pregunta
  useEffect(() => {
    setDisableAnimations(true); // Deshabilitar animaciones temporalmente
    setTimeLeft(10); // Reiniciar el temporizador a 10 segundos
    setSelectedAnswer(null); // Reiniciar selectedAnswer a null
    setShuffledOptions(shuffleOptions(question.options)); // Permutar las opciones
    setIsPaused(false); // Reiniciar el estado de pausa

    // Habilitar animaciones después de un breve retraso
    setTimeout(() => {
      setDisableAnimations(false);
    }, 100); // Ajusta este valor según sea necesario
  }, [question]); // Dependencia: question

  // Lógica del temporizador
  useEffect(() => {
    if (isPaused) return; // Si está en pausa, no hacer nada

    if (timeLeft === 0) {
      setIsPaused(true); // Iniciar pausa
      setTimeout(() => {
        onTimeOut(); // Llamar a onTimeOut después de la pausa
      }, 1000); // Esperar 1 segundo
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Limpiar el temporizador
  }, [timeLeft, onTimeOut, isPaused]);

  // Permutación dinámica de las opciones
  useEffect(() => {
    if (selectedAnswer !== null || disableAnimations) return; // No permutar si ya se respondió o si las animaciones están deshabilitadas

    const shuffleInterval = setInterval(() => {
      setShuffledOptions((prevOptions) => shuffleOptions(prevOptions));
    }, 500); // Intervalo de permutación

    return () => clearInterval(shuffleInterval); // Limpiar el intervalo
  }, [selectedAnswer, disableAnimations]);

  const handleClick = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === question.correctAnswer;
    console.log("Selected Answer:", answer);
    console.log("Correct Answer:", question.correctAnswer);
    console.log("Is Correct:", isCorrect);

    setIsPaused(true); // Iniciar pausa
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1000); // Esperar 1 segundo antes de llamar a onAnswer
  };

  return (
    <div className="bg-custom-quiz-sheet flex shadow-md justify-center h-[90vh] w-[90vw]">
      <div className="flex flex-col mx-2 my-auto pt-30 text-center w-60 md:w-85">
        <h2 className="text-xl font-bold mb-4">
          Pregunta {questionNumber} de {totalQuestions}
        </h2>
        <p className="text-gray-700 mb-4 min-h-[3rem] whitespace-pre-wrap">
          {question.question}
        </p>
        <FlipMove
          className="grid grid-cols-2 gap-6"
          duration={275} // Duración de la animación
          staggerDurationBy={100} // Retraso entre animaciones
          enterAnimation="elevator" // Animación de entrada
          leaveAnimation="fade" // Animación de salida
          maintainContainerHeight // Evitar cambios de tamaño del contenedor
          disableAllAnimations={disableAnimations} // Deshabilitar animaciones temporalmente
        >
          {shuffledOptions.map((option) => (
            <button
              key={`${question.id}-${option}`} // Clave única combinando el ID de la pregunta y la opción (el resto de implementaciones causaba muchos bugs visuales)
              onClick={() => handleClick(option)}
              className={`bttn-custom-response max-w-90 min-h-[4rem] ${
                selectedAnswer === option
                  ? option === question.correctAnswer
                    ? "bg-custom-correctAnswer"
                    : "bg-custom-wrongAnswer"
                  : ""
              } text-black`}
              disabled={selectedAnswer !== null} // Deshabilitar botones después de seleccionar una respuesta
            >
              {option}
            </button>
          ))}
        </FlipMove>
        <p className="mt-4 mb-6 md:mt-16">
          Tiempo restante:
          <br />{" "}
          <span className="text-red-400 text-xl md:text-5xl">{timeLeft}</span>
          <span className="text-red-400 ">s</span>
        </p>
        <p className="flex content-center justify-center whitespace-nowrap text-yellow-950 text-[0.6rem] md:text-[0.9rem]">
          se te restarán puntos por cada pregunta sin constestar
        </p>{" "}
      </div>
    </div>
  );
}

export default QuizCard;
