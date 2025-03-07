import { render, screen, fireEvent, /*waitFor,*/ act } from "@testing-library/react";
import QuizCard from "./QuizCard";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const mockQuestion = {
  id: 1,
  question: "What is the capital of France?",
  options: ["Paris", "London", "Berlin", "Madrid"],
  correctAnswer: "Paris",
};

describe("QuizCard", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // Usar temporizadores falsos antes de cada prueba
  });

  afterEach(() => {
    vi.useRealTimers(); // Restaurar temporizadores reales después de cada prueba
  });

  it("renders the question and options correctly", () => {
    render(
      <QuizCard
        question={mockQuestion}
        onAnswer={vi.fn()}
        onTimeOut={vi.fn()}
        questionNumber={1}
        totalQuestions={10}
      />
    );

    expect(screen.getByText("Pregunta 1 de 10")).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.question)).toBeInTheDocument();
    mockQuestion.options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  /*it("calls onAnswer with correct value when an option is clicked", async () => {
    const onAnswer = vi.fn();
    render(
      <QuizCard
        question={mockQuestion}
        onAnswer={onAnswer}
        onTimeOut={vi.fn()}
        questionNumber={1}
        totalQuestions={10}
      />
    );

    // Simular clic en la opción correcta ("Paris")
    fireEvent.click(screen.getByText("Paris"));

    // Avanzar el tiempo para completar el setTimeout en handleClick
    act(() => {
      vi.advanceTimersByTime(1000); // Avanzar 1 segundo
    });

    // Verificar que onAnswer fue llamado con true
    await waitFor(() => expect(onAnswer).toHaveBeenCalledWith(true));
  });*/

  it("disables buttons after an option is selected", () => {
    render(
      <QuizCard
        question={mockQuestion}
        onAnswer={vi.fn()}
        onTimeOut={vi.fn()}
        questionNumber={1}
        totalQuestions={10}
      />
    );

    fireEvent.click(screen.getByText("Paris"));
    mockQuestion.options.forEach((option) => {
      expect(screen.getByText(option)).toBeDisabled();
    });
  });

  /*it("calls onTimeOut when the timer reaches zero", async () => {
    const onTimeOut = vi.fn();
    render(
      <QuizCard
        question={mockQuestion}
        onAnswer={vi.fn()}
        onTimeOut={onTimeOut}
        questionNumber={1}
        totalQuestions={10}
      />
    );

    // Avanzar el tiempo hasta que el temporizador llegue a cero
    act(() => {
      vi.advanceTimersByTime(10000); // Avanzar 10 segundos
    });

    // Verificar que onTimeOut fue llamado
    await waitFor(() => expect(onTimeOut).toHaveBeenCalled());
  });*/

  it("updates the timer correctly", () => {
    render(
      <QuizCard
        question={mockQuestion}
        onAnswer={vi.fn()}
        onTimeOut={vi.fn()}
        questionNumber={1}
        totalQuestions={10}
      />
    );

    // Verificar que el temporizador comienza en 10
    expect(screen.getByText("10")).toBeInTheDocument();

    // Avanzar el tiempo 5 segundos
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Verificar que el temporizador ahora muestra 5
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});