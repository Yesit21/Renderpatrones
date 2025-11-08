import { useState, useEffect } from "react"
import { generateEquation, generateSolutionSteps, type Equation } from "@/lib/gameUtils"

type DeckLevel = "Básico" | "Avanzado" | "Experto"

export const useGameLogic = (
  selectedDeck: DeckLevel,
  saveUserPoints: (newScore: number) => Promise<void>
) => {
  const [currentEquation, setCurrentEquation] = useState<Equation | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [isAnalyzed, setIsAnalyzed] = useState(false)
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [selectedOperation, setSelectedOperation] = useState<"+" | "-" | "*" | "/">("+")
  const [showHint, setShowHint] = useState<string | null>(null)
  const [hintStep, setHintStep] = useState<1 | 2 | 3 | 4 | null>(null)

  useEffect(() => {
    if (isTimerActive && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0 && isTimerActive) {
      handleIncorrectAnswer()
    }
  }, [timeRemaining, isTimerActive])

  const handleGenerateEquation = async (score: number, setScore: (score: number) => void, setRound: (round: number) => void, round: number) => {
    setShowHint(null)
    setHintStep(null)

    try {
      const response = await fetch("/api/generate-equation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level: selectedDeck,
          operation: selectedOperation,
        }),
      })

      if (!response.ok) {
        throw new Error("Error al generar ecuación")
      }

      const data = await response.json()
      setCurrentEquation(data)
      setUserAnswer("")
      setIsAnalyzed(false)
      setFeedback(null)
      setTimeRemaining(30)
      setIsTimerActive(true)
    } catch (error) {
      console.error("[v0] Error al generar ecuación:", error)
      const newEquation = generateEquation(selectedDeck)
      setCurrentEquation(newEquation)
      setUserAnswer("")
      setIsAnalyzed(false)
      setFeedback(null)
      setTimeRemaining(30)
      setIsTimerActive(true)
    }
  }

  const checkAnswer = (score: number, setScore: (score: number) => void, setRound: (round: number) => void, round: number) => {
    if (!currentEquation) return

    const answer = Number.parseFloat(userAnswer)
    const tolerance = selectedOperation === "/" ? 0.1 : 0.01
    const isCorrect = Math.abs(answer - currentEquation.solution) < tolerance

    if (isCorrect) {
      setFeedback("correct")
      const newScore = score + 10
      setScore(newScore)
      saveUserPoints(newScore)
      setIsAnalyzed(true)
      setIsTimerActive(false)
      setTimeout(() => {
        handleGenerateEquation(newScore, setScore, setRound, round + 1)
        setRound(round + 1)
      }, 2000)
    } else {
      handleIncorrectAnswer()
    }
  }

  const handleIncorrectAnswer = () => {
    setFeedback("incorrect")
    setIsAnalyzed(true)
    setIsTimerActive(false)
  }

  const handleNextEquation = (score: number, setScore: (score: number) => void, setRound: (round: number) => void, round: number) => {
    handleGenerateEquation(score, setScore, setRound, round)
    setRound(round + 1)
  }

  const handleHintClick = (step: 1 | 2 | 3 | 4) => {
    if (!currentEquation) return

    const steps = generateSolutionSteps(currentEquation)
    setHintStep(step)

    switch (step) {
      case 1:
        // Muestra los primeros 2 pasos
        setShowHint(steps.slice(0, 3).join("\n"))
        break
      case 2:
        // Muestra hasta el paso 3
        setShowHint(steps.slice(0, 4).join("\n"))
        break
      case 3:
        // Muestra hasta el paso final sin la respuesta
        setShowHint(steps.slice(0, 5).join("\n"))
        break
      case 4:
        // Muestra la solución completa
        setShowHint(steps.join("\n"))
        break
    }
  }

  return {
    // State
    currentEquation,
    userAnswer,
    isAnalyzed,
    feedback,
    timeRemaining,
    isTimerActive,
    selectedOperation,
    showHint,
    hintStep,

    // Setters
    setCurrentEquation,
    setUserAnswer,
    setIsAnalyzed,
    setFeedback,
    setTimeRemaining,
    setIsTimerActive,
    setSelectedOperation,
    setShowHint,
    setHintStep,

    // Functions
    handleGenerateEquation,
    checkAnswer,
    handleIncorrectAnswer,
    handleNextEquation,
    handleHintClick,
  }
}