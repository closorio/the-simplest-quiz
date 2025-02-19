
interface ResultsProps {
  score: number;
  totalQuestions: number;
  userAnswers: boolean[];
}

function Results({ score, totalQuestions, userAnswers }: ResultsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
      <h2 className="text-xl font-bold mb-4">Resultados Finales</h2>
      <p>
        Puntaje Global: {score} / {totalQuestions}
      </p>
      <div className="mt-4">
        {userAnswers.map((isCorrect, index) => (
          <p key={index} className={isCorrect ? "text-green-500" : "text-red-500"}>
            Pregunta {index + 1}: {isCorrect ? "Correcta" : "Incorrecta"}
          </p>
        ))}
      </div>
      <div className="my-8">
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Volver a intentar
        </button>
      </div>
    </div>
  );
}

export default Results;