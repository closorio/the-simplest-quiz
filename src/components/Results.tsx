import { useState } from "react";

interface ResultsProps {
  score: number;
  totalQuestions: number;
  userAnswers: boolean[];
  onSaveScore: (name: string) => void;
}

function Results({ score, totalQuestions, userAnswers, onSaveScore }: ResultsProps) {
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
    <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
      <h2 className="text-2xl font-bold mb-4">Resultados Finales</h2>
      <p className="mb-4">
        Puntaje: {score} / {totalQuestions}
      </p>
      <div className="mb-4">
        {userAnswers.map((isCorrect, index) => (
          <p key={index} className={isCorrect ? "text-green-500" : "text-red-500"}>
            Pregunta {index + 1}: {isCorrect ? "Correcta" : "Incorrecta"}
          </p>
        ))}
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleSaveScore}
        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isSaving}
      >
        Guardar Puntaje
      </button>
    </div>
  );
}

export default Results;