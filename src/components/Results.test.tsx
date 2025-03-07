import { render, screen, /*waitFor*/ } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Results from './Results';

describe('Results Component', () => {
  const mockProps = {
    score: 8,
    totalQuestions: 10,
    userAnswers: [true, false, true, true, false, true, true, true, false, true],
    onSaveScore: vi.fn(),
  };

  it('renders the component with correct score and total questions', () => {
    render(<Results {...mockProps} />);
    expect(screen.getByText(/Resultados/i)).toBeInTheDocument();
    expect(screen.getByText(/Puntaje: 8 \/ 10/i)).toBeInTheDocument();
  });

  it('displays correct and incorrect answers', () => {
    render(<Results {...mockProps} />);
    const correctAnswers = screen.getAllByText(/Pregunta \d+: Correcta/i);
    const incorrectAnswers = screen.getAllByText(/Pregunta \d+: Incorrecta/i);
  
    expect(correctAnswers.length).toBe(7);
    expect(incorrectAnswers.length).toBe(3);
  });

  it('renders the correct text for each answer', () => {
    render(<Results {...mockProps} />);
  
    // Verifica que cada respuesta tenga el texto correcto
    mockProps.userAnswers.forEach((isCorrect, index) => {
      const answerText = screen.getByText(
        `Pregunta ${index + 1}: ${isCorrect ? "Correcta" : "Incorrecta"}`
      );
      expect(answerText).toBeInTheDocument();
    });
  });

  it('allows the user to input their name', async () => {
    render(<Results {...mockProps} />);
    const input = screen.getByPlaceholderText(/Ingresa tu nombre/i);
    await userEvent.type(input, 'John Doe');
    expect(input).toHaveValue('John Doe');
  });

  it('calls onSaveScore when the save button is clicked with a valid name', async () => {
    render(<Results {...mockProps} />);
    const input = screen.getByPlaceholderText(/Ingresa tu nombre/i);
    const button = screen.getByText(/Guardar Puntaje/i);

    await userEvent.type(input, 'John Doe');
    await userEvent.click(button);

    expect(mockProps.onSaveScore).toHaveBeenCalledWith('John Doe');
  });

  /*it('shows an alert when the save button is clicked without a name', async () => {
    // Mock de la función alert
    window.alert = vi.fn();
  
    render(<Results {...mockProps} />);
  
    // Verificar que el campo de entrada esté vacío
    const input = screen.getByPlaceholderText(/Ingresa tu nombre/i);
    expect(input).toHaveValue('');
  
    // Obtener el botón de guardar
    const button = screen.getByText(/Guardar Puntaje/i);
  
    // Hacer clic en el botón sin ingresar un nombre
    await userEvent.click(button);
  
    // Verificar que se haya mostrado la alerta
    expect(window.alert).toHaveBeenCalledWith('Por favor, ingresa tu nombre.');
  
    // Verificar que onSaveScore no haya sido llamada
    expect(mockProps.onSaveScore).not.toHaveBeenCalled();
  });*/

  it('calls onSaveScore when the save button is clicked with a valid name', async () => {
    render(<Results {...mockProps} />);
  
    // Ingresa un nombre válido
    const input = screen.getByPlaceholderText(/Ingresa tu nombre/i);
    await userEvent.type(input, 'John Doe');
  
    // Haz clic en el botón "Guardar Puntaje"
    const button = screen.getByText(/Guardar Puntaje/i);
    await userEvent.click(button);
  
    // Verifica que onSaveScore haya sido llamada con el nombre correcto
    expect(mockProps.onSaveScore).toHaveBeenCalledWith('John Doe');
  });

  /*it('disables the save button while saving', async () => {
    // Mock de onSaveScore para simular una operación asíncrona
    mockProps.onSaveScore.mockImplementation(() => {
      return new Promise((resolve) => setTimeout(resolve, 1000)); // Simula una operación asíncrona
    });
  
    render(<Results {...mockProps} />);
  
    // Ingresa un nombre válido
    const input = screen.getByPlaceholderText(/Ingresa tu nombre/i);
    await userEvent.type(input, 'John Doe');
  
    // Haz clic en el botón "Guardar Puntaje"
    const button = screen.getByText(/Guardar Puntaje/i);
    await userEvent.click(button);
  
    // Verifica que el botón esté deshabilitado
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50 cursor-not-allowed');
  
    // Espera a que la operación asíncrona termine
    await waitFor(() => expect(mockProps.onSaveScore).toHaveBeenCalled());
  
    // Verifica que el botón esté habilitado nuevamente
    expect(button).not.toBeDisabled();
    expect(button).not.toHaveClass('opacity-50 cursor-not-allowed');
  });*/

  it('does not disable the save button when name is empty', async () => {
    render(<Results {...mockProps} />);
  
    // Haz clic en el botón "Guardar Puntaje" sin ingresar un nombre
    const button = screen.getByText(/Guardar Puntaje/i);
    await userEvent.click(button);
  
    // Verifica que el botón no esté deshabilitado
    expect(button).not.toBeDisabled();
    expect(button).not.toHaveClass('opacity-50 cursor-not-allowed');
  });

});