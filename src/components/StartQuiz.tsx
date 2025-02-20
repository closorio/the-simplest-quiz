interface StartScreenProps {
  onStart: () => void;
  scores: { name: string; score: number }[];
}

function StartScreen({ onStart, scores }: StartScreenProps) {
  // Ordena los puntajes de mayor a menor
  const sortedScores = scores.sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
      <h1 className="text-2xl font-bold mb-4">¡Bienvenid@ a The simplest quiz!</h1>
      <p className="mb-4">
        Este quiz consta de preguntas de opción múltiple muy sencillas. Tendrás 10 segundos para responder cada
        pregunta. ¡Buena suerte!
      </p>
      <button
        onClick={onStart}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Iniciar Quiz
      </button>

      <h2 className="text-xl font-bold mb-2">Tabla de Puntajes</h2>
      {sortedScores.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Puntaje</th>
            </tr>
          </thead>
          <tbody>
            {sortedScores.map((entry, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{entry.name}</td>
                <td className="border px-4 py-2">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay puntajes guardados todavía.</p>
      )}
    </div>
  );
}

export default StartScreen;