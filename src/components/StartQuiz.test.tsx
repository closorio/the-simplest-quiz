import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import StartScreen from './StartQuiz';

describe('StartScreen Component', () => {
  const mockOnStart = vi.fn();
  const mockScores = [
    { name: 'Alice', score: 100 },
    { name: 'Bob', score: 90 },
    { name: 'Charlie', score: 80 },
  ];

  beforeEach(() => {
    // Limpiar todas las instancias y llamadas a constructor y todos los métodos:
    mockOnStart.mockClear();
  });

  it('renders the component correctly', () => {
    render(<StartScreen onStart={mockOnStart} scores={mockScores} />);

    // Verificar que el título se renderiza correctamente
    expect(screen.getByText('¡Bienvenid@ a The simplest Quiz!')).toBeInTheDocument();

    // Verificar que el botón de inicio está presente
    expect(screen.getByText('Iniciar Quiz')).toBeInTheDocument();

    // Verificar que la lista de puntajes se renderiza correctamente
    expect(screen.getByText('Top 3 Mejores puntajes')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('calls onStart when the button is clicked', () => {
    render(<StartScreen onStart={mockOnStart} scores={mockScores} />);

    // Simular clic en el botón de inicio
    fireEvent.click(screen.getByText('Iniciar Quiz'));

    // Verificar que la función onStart fue llamada
    expect(mockOnStart).toHaveBeenCalledTimes(1);
  });

  it('sorts scores correctly', () => {
    render(<StartScreen onStart={mockOnStart} scores={mockScores} />);

    // Verificar que los puntajes están ordenados correctamente
    const scoreCells = screen.getAllByRole('cell');
    expect(scoreCells[0].textContent).toBe('Alice');
    expect(scoreCells[1].textContent).toBe('100');
    expect(scoreCells[2].textContent).toBe('Bob');
    expect(scoreCells[3].textContent).toBe('90');
    expect(scoreCells[4].textContent).toBe('Charlie');
    expect(scoreCells[5].textContent).toBe('80');
  });

  it('displays a message when there are no scores', () => {
    render(<StartScreen onStart={mockOnStart} scores={[]} />);

    // Verificar que se muestra el mensaje de no hay puntajes
    expect(screen.getByText('No hay puntajes guardados todavía.')).toBeInTheDocument();
  });

  it('adjusts styles based on screen size', async () => {
    // Renderizar el componente
    const { container } = render(<StartScreen onStart={mockOnStart} scores={mockScores} />);

    // Seleccionar el contenedor principal por su clase
    const mainContainer = container.querySelector('.flex.rounded-lg.shadow-md.justify-center.max-w-5xl.w-full.max-h-screen.md\\:w-3\\/4.lg\\:w-full');

    // Verificar que el contenedor existe
    expect(mainContainer).toBeInTheDocument();

    // Simular un tamaño de pantalla móvil (800px)
    global.innerWidth = 800;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });

    // Verificar que se aplica la clase correcta para móvil/tablet
    await waitFor(() => {
      expect(mainContainer).toHaveClass('bg-custom-half-blackboard');
    });

    // Simular un tamaño de pantalla de escritorio (1200px)
    global.innerWidth = 1200;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });

    // Verificar que se aplica la clase correcta para escritorio
    await waitFor(() => {
      expect(mainContainer).toHaveClass('bg-custom-blackboard');
    });
  });
});