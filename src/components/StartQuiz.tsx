interface StartScreenProps {
    onStart: () => void;
  }
  
  function StartScreen({ onStart }: StartScreenProps) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Bienvenido al Quiz</h1>
        <p className="mb-4">
          Este quiz consta de preguntas de opción múltiple. Tendrás 1 minuto para responder cada
          pregunta. ¡Buena suerte!
        </p>
        <button
          onClick={onStart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Iniciar Quiz
        </button>
      </div>
    );
  }
  
  export default StartScreen;