"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cyberbullyingScenarios } from "@/data/cyberbullying-scenarios"
import IntroScreen from "./intro-screen"
import ScenarioScreen from "./scenario-screen"
import ResultsScreen from "./results-screen"
import ProgressBar from "./progress-bar"
import ScoreDisplay from "./score-display"
import AboutPage from "./layout/about-page"
import Navigation from "./layout/navigation"
import confetti from "canvas-confetti"
import type { Scenario, GameState, Difficulty, Answer } from "@/types/game"

// Create memoized version of ScenarioScreen to prevent unnecessary rerenders
const MemoizedScenarioScreen = memo(ScenarioScreen)

export default function GameContainer() {
  const [gameState, setGameState] = useState<GameState>("intro")
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [previousScore, setPreviousScore] = useState<number | undefined>(undefined)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner")
  const [scenariosForLevel, setScenariosForLevel] = useState<Scenario[]>([])
  const [currentPage, setCurrentPage] = useState("home")
  const [previousState, setPreviousState] = useState<GameState>("intro")
  const [isLoading, setIsLoading] = useState(false)

  // Ref to track if component is mounted
  const isMounted = useRef(true)

  const loadScenarios = useCallback(async () => {
    // Simula carregamento dinâmico, pode ser substituído por API real
    setIsLoading(true);
    const filtered = cyberbullyingScenarios.filter((s) => s.difficulty === difficulty || s.difficulty === "all");
    setScenariosForLevel(filtered);
    setIsLoading(false);
  }, [difficulty]);

  // Replace the existing useEffect with the new loadScenarios call
  useEffect(() => {
    loadScenarios();
  }, [loadScenarios]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const totalScenarios = scenariosForLevel.length
  const progress = totalScenarios > 0 ? (currentScenarioIndex / totalScenarios) * 100 : 0

  const startGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty)
    setGameState("playing")
    // Reset score and answers when starting a new game
    setScore(0)
    setPreviousScore(undefined)
    setAnswers([])
    setCurrentScenarioIndex(0)
  }

  const handleScenarioComplete = (scenarioResult: Answer) => {
    if (!isMounted.current) return

    // Save the previous score before updating
    setPreviousScore(score)

    // Update score
    if (scenarioResult.isCorrect) {
      const pointsEarned = difficulty === "beginner" ? 10 : difficulty === "intermediate" ? 15 : 20

      // Use functional update to ensure we're working with the latest state
      setScore((prevScore) => {
        const newScore = prevScore + pointsEarned

        // Trigger confetti for correct answers com as cores da OAB-Goiás
        setTimeout(() => {
          if (isMounted.current) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#005691", "#6496c1", "#C00000"], // Cores da OAB-Goiás: azul, azul claro e vermelho
            })
          }
        }, 300)

        return newScore
      })
    }

    // Save answer
    setAnswers((prev) => [...prev, scenarioResult])

    // Move to next scenario or results after a short delay to allow animations
    setTimeout(() => {
      if (!isMounted.current) return

      if (currentScenarioIndex < scenariosForLevel.length - 1) {
        setCurrentScenarioIndex((prevIndex) => prevIndex + 1)
      } else {
        setGameState("results")
      }
    }, 500)
  }

  const restartGame = () => {
    setGameState("intro")
    setCurrentScenarioIndex(0)
    setScore(0)
    setPreviousScore(undefined)
    setAnswers([])
    setCurrentPage("home")
  }

  const handleNavigate = (page: string) => {
    if (page === "about") {
      setPreviousState(gameState)
      setCurrentPage("about")
    } else if (page === "help") {
      setPreviousState(gameState)
      setCurrentPage("help")
    } else {
      setCurrentPage("home")
    }
  }

  const handleBackToGame = () => {
    setCurrentPage("home")
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Navigation onNavigate={handleNavigate} currentPage={currentPage} />

      {gameState !== "intro" && gameState !== "results" && currentPage === "home" && (
        <div className="mb-6 flex justify-between items-center">
          <ScoreDisplay score={score} difficulty={difficulty} previousScore={previousScore} />
          <ProgressBar progress={progress} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentPage === "about" && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <AboutPage onBack={handleBackToGame} />
          </motion.div>
        )}

        {currentPage === "home" && gameState === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <IntroScreen onStart={startGame} />
          </motion.div>
        )}

        {currentPage === "home" && gameState === "playing" && scenariosForLevel.length > 0 && (
          <motion.div
            key={`scenario-${currentScenarioIndex}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <MemoizedScenarioScreen
              scenario={scenariosForLevel[currentScenarioIndex]}
              onComplete={handleScenarioComplete}
              difficulty={difficulty}
            />
          </motion.div>
        )}

        {currentPage === "home" && gameState === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ResultsScreen
              score={score}
              answers={answers}
              scenarios={scenariosForLevel}
              difficulty={difficulty}
              onRestart={restartGame}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

