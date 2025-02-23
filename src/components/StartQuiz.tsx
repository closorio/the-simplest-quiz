import { useEffect, useState } from 'react';

interface StartScreenProps {
  onStart: () => void;
  scores: { name: string; score: number }[];
}

function StartScreen({ onStart, scores }: StartScreenProps) {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  const checkScreenSize = () => {
    setIsMobileOrTablet(window.innerWidth < 1024);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const sortedScores = scores.sort((a, b) => b.score - a.score);

  return (
    <div
      className={`flex rounded-lg shadow-md justify-center max-w-5xl w-full max-h-screen md:w-3/4 lg:w-full ${
        isMobileOrTablet ? 'bg-custom-half-blackboard' : 'bg-custom-blackboard'
      }`}
    >
      <div className="flex flex-col mx-2 text-center max-w-100 md:max-w-[90vw] w-11/12 md:w-90 lg:w-full lg:px-24 lg:py-28">
        <div className="mt-10 md:mt-18 mb-2 md:mb-8 px-16">
          <h1 className="text-2xl lg:text-4xl text-yellow-500 font-finger-paint font-bold mb-4">
            ¡Bienvenid@ a The simplest Quiz!
          </h1>
          <p className="mb-2 md:mb-4 text-sm lg:text-lg text-white">
            Este quiz consta de preguntas de opción múltiple muy sencillas.<br />
            Tendrás <span className="text-green-400 text-2xl">10</span> segundos para responder cada pregunta.
            <br />
           <span className="text-green-400"> ¡Buena suerte! </span>
          </p>
          <button
            onClick={onStart}
            className="mt-5 md:mt-8 my-2 md:my-4 p-12 py-2 font-semibold bg-transparent hover:bg-blue-500 text-blue-500  hover:text-white   border border-white hover:border-transparent rounded"
          >
            Iniciar Quiz
          </button>
        </div>

        <div className="mb-2 px-16">
          <h2 className="text-lg md:text-xl text-white font-bold mb-2 pb-2 border-b-2 border-white">
            Top 3 Mejores puntajes
          </h2>
          <div className="text-white w-full max-h-64 mb-12 rounded-xl shadow-lg">
            {sortedScores.length > 0 ? (
              <table className="w-full max-w-xl mx-auto border-collapse">
                <thead>
                  <tr className="">
                    <th className="px-2 pb-2">Nombre</th>
                    <th className="px-2 pb-2">Puntaje</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedScores.slice(0,3).map((entry, index) => (
                    <tr key={index}>
                      <td className="border px-2 py-1">{entry.name}</td>
                      <td className="border px-2 py-1">{entry.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay puntajes guardados todavía.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;