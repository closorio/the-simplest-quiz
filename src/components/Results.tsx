import { useState } from "react";

interface ResultsProps {
  score: number;
  totalQuestions: number;
  userAnswers: boolean[];
  onSaveScore: (name: string) => void;
}

function Results({
  score,
  totalQuestions,
  userAnswers,
  onSaveScore,
}: ResultsProps) {
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveScore = () => {
    if (isSaving) return; // Evitar múltiples envíos
    setIsSaving(true); // Deshabilitar el botón

    if (name.trim()) {
      onSaveScore(name); // Llamar a la función para guardar el puntaje
      setIsSaving(false); // Rehabilitar el botón
    } else {
      alert("Por favor, ingresa tu nombre.");
      setIsSaving(false); // Rehabilitar el botón
    }
  };

  return (
    <div className="bg-custom-answer-sheet flex justify-center py-10 rounded-lg shadow-md w-[90vw] h-[90vh] text-center md:mt-10 ml-3">
      <div className="flex flex-col justify-center mx-2 my-auto text-center w-60 md:w-85">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Resultados</h2>
        <p className="mb-2 md:mb-4 text-gray-500">
          Puntaje: {score} / {totalQuestions}
        </p>
        <div className="mb-6 md:mb-10 text-sm md:text-lg">
          {userAnswers.map((isCorrect, index) => (
            <p
              key={index}
              className={isCorrect ? "text-green-500" : "text-red-500"}
            >
              Pregunta {index + 1}: {isCorrect ? "Correcta" : "Incorrecta"}
            </p>
          ))}
        </div>
        <div className="mb-2 w-50 md:w-60 mx-auto">
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border-2 border-yellow-950 text-center rounded"
          />
        </div>
        <button
          onClick={handleSaveScore}
          className={`bttn-custom-save-score py-2 w-50 md:w-60 mx-auto ${
            isSaving ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSaving}
        >
          Guardar Puntaje
        </button>
      </div>
    </div>
  );
}

export default Results;
