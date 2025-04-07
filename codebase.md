# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules

# next.js
/.next/
/out/

# production
/build

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

# app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 210 90% 40%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 90% 95%;
    --accent-foreground: 210 90% 40%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 210 90% 40%;
    --radius: 0.5rem;
    /* Theme variables will be injected here */
    --color-primary: #0078c8;
    --color-secondary: #3ab0f8;
    --color-accent: #7dcbfc;
    --color-background: #ffffff;
    --color-text: #1a1a1a;
    --color-border: #e5e7eb;
    --color-success: #22c55e;
    --color-error: #ef4444;
    --color-warning: #f59e0b;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    background-color: var(--color-background);
    color: var(--color-text);
  }
}

.animate-bounce-slow {
  animation: bounce 3s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

/* Optimize drag and drop performance */
.dragging {
  will-change: transform;
  transform: translateZ(0);
}

/* Prevent layout shifts during drag operations */
.drag-container {
  contain: layout;
}

/* Improve touch interactions */
@media (pointer: coarse) {
  .drag-handle {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Example utility classes */
.bg-primary {
  background-color: var(--color-primary);
}

.text-primary {
  color: var(--color-primary);
}

/* Add more utility classes as needed */


```

# app/layout.tsx

```tsx
import type { Metadata } from 'next'
import { ThemeProvider } from '@/contexts/theme-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'Detetives Digitais',
  description: 'Jogo educativo sobre cyberbullying',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

```

# app/page.tsx

```tsx
import { Suspense } from "react"
import GameContainer from "@/components/game-container"
import LoadingScreen from "@/components/loading-screen"
import Header from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4 pt-24 pb-12">
        <Suspense fallback={<LoadingScreen />}>
          <GameContainer />
        </Suspense>
      </div>
    </main>
  )
}


```

# components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

# components/difficulty-selector.tsx

```tsx
"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import type { Difficulty } from "@/types/game"

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void
}

export default function DifficultySelector({ onSelect }: DifficultySelectorProps) {
  const difficulties: {
    value: Difficulty
    label: string
    description: string
    features: string[]
    badge?: string
  }[] = [
    {
      value: "beginner",
      label: "Iniciante",
      description: "Para pais que estão começando a aprender sobre segurança digital.",
      features: ["Cenários mais simples", "Dicas detalhadas", "Feedback extenso"],
    },
    {
      value: "intermediate",
      label: "Intermediário",
      description: "Para pais que já têm algum conhecimento sobre riscos online.",
      features: ["Cenários desafiadores", "Situações complexas", "Aspectos legais básicos"],
      badge: "Recomendado",
    },
    {
      value: "advanced",
      label: "Avançado",
      description: "Para pais que buscam um conhecimento aprofundado.",
      features: ["Dilemas éticos", "Aspectos legais avançados", "Estratégias preventivas"],
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center text-blue-800 mb-6">Escolha o nível de dificuldade</h2>

      <div className="grid gap-4">
        {difficulties.map((difficulty, index) => (
          <motion.div
            key={difficulty.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white border border-blue-200 rounded-lg p-4 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all"
            onClick={() => onSelect(difficulty.value)}
          >
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-2xl font-bold text-blue-700">{index + 1}</span>
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-1">
                  <h3 className="font-bold text-blue-800">{difficulty.label}</h3>
                  {difficulty.badge && (
                    <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 border-blue-300">
                      {difficulty.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-blue-600 mb-2">{difficulty.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {difficulty.features.map((feature, fIndex) => (
                    <span key={fIndex} className="text-xs px-2 py-1 bg-blue-50 rounded-full text-blue-700">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


```

# components/feedback-card.tsx

```tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, ArrowRight } from "lucide-react"
import type { Scenario } from "@/types/game"

interface FeedbackCardProps {
  scenario: Scenario
  selectedOption: number
  onNext: () => void
}

export default function FeedbackCard({ scenario, selectedOption, onNext }: FeedbackCardProps) {
  const isCorrect = selectedOption === scenario.correctAnswer

  return (
    <Card className="w-full overflow-hidden">
      <div className={`p-6 ${isCorrect ? "bg-green-600" : "bg-red-600"} text-white`}>
        <div className="flex items-center">
          {isCorrect ? <CheckCircle className="w-6 h-6 mr-2" /> : <XCircle className="w-6 h-6 mr-2" />}
          <h2 className="text-2xl font-bold">{isCorrect ? "Correto!" : "Incorreto"}</h2>
        </div>
      </div>

      <CardContent className="p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Você escolheu:</h3>
            <p className="p-3 border rounded-md bg-gray-50">{scenario.options[selectedOption]}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Feedback:</h3>
            <div
              className={`p-4 rounded-md ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
            >
              <p>{scenario.feedback[selectedOption]}</p>
            </div>
          </div>

          {!isCorrect && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Resposta recomendada:</h3>
              <div className="p-4 rounded-md bg-green-50 border border-green-200">
                <p className="font-medium text-green-800 mb-2">{scenario.options[scenario.correctAnswer]}</p>
                <p className="text-green-700">{scenario.feedback[scenario.correctAnswer]}</p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Saiba mais:</h3>
            <div className="p-4 rounded-md bg-blue-50 border border-blue-200">
              <p className="text-blue-700">{scenario.additionalInfo}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700 text-white">
              Próximo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}


```

# components/feedback-panel.tsx

```tsx
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, ArrowRight, Info, ArrowLeft } from "lucide-react"
import type { Scenario, InteractionType } from "@/types/game"

interface FeedbackPanelProps {
  scenario: Scenario
  userAnswer: any
  isCorrect: boolean
  onContinue: () => void
  onBack?: () => void
}

export default function FeedbackPanel({ scenario, userAnswer, isCorrect, onContinue, onBack }: FeedbackPanelProps) {
  const formatAnswer = (answer: any, type: InteractionType) => {
    switch (type) {
      case "multiple-choice":
        return scenario.options?.[answer] || "Resposta não encontrada"
      case "slider":
        return `${answer}${scenario.sliderConfig?.unit || ""}`
      case "chat":
        return answer
      case "drag-drop":
        return "Sua classificação dos itens"
      case "timeline":
        return "Sua ordem dos eventos"
      case "hotspot":
        const hotspot = scenario.hotspots?.find((h) => h.id === answer)
        return hotspot ? hotspot.label : "Seleção não encontrada"
      default:
        return JSON.stringify(answer)
    }
  }

  const formatCorrectAnswer = (answer: any, type: InteractionType) => {
    switch (type) {
      case "multiple-choice":
        return scenario.options?.[answer as number] || "Resposta não encontrada"
      case "slider":
        return `${answer}${scenario.sliderConfig?.unit || ""}`
      case "chat":
        return `Palavras-chave esperadas: ${(answer as string[]).join(", ")}`
      case "drag-drop":
        return "Classificação correta dos itens"
      case "timeline":
        return "Ordem correta dos eventos"
      case "hotspot":
        const hotspot = scenario.hotspots?.find((h) => h.id === answer)
        return hotspot ? hotspot.label : "Seleção não encontrada"
      default:
        return JSON.stringify(answer)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div
        className={`p-4 rounded-md ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"} mb-6`}
      >
        <div className="flex items-center mb-2">
          {isCorrect ? (
            <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
          ) : (
            <XCircle className="w-6 h-6 mr-2 text-red-600" />
          )}
          <h3 className="text-lg font-semibold">{isCorrect ? "Correto!" : "Incorreto"}</h3>
        </div>
        <p className={isCorrect ? "text-green-700" : "text-red-700"}>
          {isCorrect ? scenario.correctFeedback : scenario.incorrectFeedback}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Sua resposta:</h3>
        <p className="p-3 border rounded-md bg-slate-50">{formatAnswer(userAnswer, scenario.interactionType)}</p>
      </div>

      {!isCorrect && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Resposta recomendada:</h3>
          <div className="p-4 rounded-md bg-green-50 border border-green-200">
            <p className="font-medium text-green-800 mb-2">
              {formatCorrectAnswer(scenario.correctAnswer, scenario.interactionType)}
            </p>
            <p className="text-green-700">{scenario.correctFeedback}</p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Info className="w-5 h-5 mr-2 text-blue-600" />
          <h3 className="text-lg font-semibold">Saiba mais:</h3>
        </div>
        <div className="p-4 rounded-md bg-blue-50 border border-blue-200">
          <p className="text-blue-700">{scenario.additionalInfo}</p>

          {scenario.legalInfo && (
            <div className="mt-3 pt-3 border-t border-blue-200">
              <p className="text-sm font-medium text-blue-800 mb-1">Aspectos Legais:</p>
              <p className="text-sm text-blue-700">{scenario.legalInfo}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        {onBack && (
          <Button onClick={onBack} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar à pergunta
          </Button>
        )}
        <div className={onBack ? "" : "ml-auto"}>
          <Button onClick={onContinue} className="bg-blue-600 hover:bg-blue-700 text-white">
            Continuar <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}


```

# components/game-container.tsx

```tsx
"use client"

import { useState, useEffect, useRef, useCallback } from "react"
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

        // Trigger confetti for correct answers
        setTimeout(() => {
          if (isMounted.current) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#0078c8", "#3ab0f8", "#7dcbfc"],
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


```

# components/header.tsx

```tsx
"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="https://www.rafaelmaciel.com.br" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/logo.png"
              alt="Rafael Maciel Sociedade de Advogados"
              width={150}
              height={60}
              className="h-12 w-auto"
            />
          </a>
        </motion.div>
        <motion.div
          className="text-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Cyberbullying
          </h1>
          <p className="text-sm text-blue-600">Game educativo para prevenção e combate.</p>
        </motion.div>
      </div>
    </header>
  )
}


```

# components/interactions/category-selection-interaction.tsx

```tsx
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"

interface CategorySelectionProps {
  items: { id: string; content: string }[]
  categories: { id: string; name: string }[]
  onComplete: (result: Record<string, string[]>) => void
}

export default function CategorySelectionInteraction({ items, categories, onComplete }: CategorySelectionProps) {
  // State to track which items are in which categories
  const [categorizedItems, setCategorizedItems] = useState<Record<string, string[]>>(() => {
    const initialMap: Record<string, string[]> = {}
    categories.forEach((category) => {
      initialMap[category.id] = []
    })
    return initialMap
  })

  // State to track which items haven't been categorized yet
  const [uncategorizedItems, setUncategorizedItems] = useState<string[]>(items.map((item) => item.id))

  // State to track which item is currently selected
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  // State to track if all items have been categorized
  const [allItemsCategorized, setAllItemsCategorized] = useState(false)

  // State to track if user attempted to submit without categorizing all items
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  // Check if all items are categorized
  useEffect(() => {
    setAllItemsCategorized(uncategorizedItems.length === 0)
    if (attemptedSubmit && uncategorizedItems.length === 0) {
      setAttemptedSubmit(false)
    }
  }, [uncategorizedItems, attemptedSubmit])

  // Function to handle selecting an item
  const handleSelectItem = (itemId: string) => {
    setSelectedItem(itemId)
  }

  // Function to handle assigning an item to a category
  const handleAssignToCategory = (categoryId: string) => {
    if (!selectedItem) return

    // Add item to the selected category
    setCategorizedItems((prev) => ({
      ...prev,
      [categoryId]: [...prev[categoryId], selectedItem],
    }))

    // Remove item from uncategorized items
    setUncategorizedItems((prev) => prev.filter((id) => id !== selectedItem))

    // Clear selection
    setSelectedItem(null)
  }

  // Function to handle removing an item from a category
  const handleRemoveFromCategory = (categoryId: string, itemId: string) => {
    // Remove item from the category
    setCategorizedItems((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId].filter((id) => id !== itemId),
    }))

    // Add item back to uncategorized items
    setUncategorizedItems((prev) => [...prev, itemId])
  }

  // Function to handle submission
  const handleSubmit = () => {
    if (!allItemsCategorized) {
      setAttemptedSubmit(true)
      return
    }

    onComplete(categorizedItems)
  }

  // Helper function to get item content by ID
  const getItemContent = (itemId: string) => {
    return items.find((item) => item.id === itemId)?.content || ""
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-blue-600 italic text-center mb-4">
        Selecione um item e clique em uma categoria para classificá-lo
      </p>

      {/* Uncategorized items */}
      <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-100 mb-4">
        <h3 className="font-medium text-blue-700 mb-3">Itens disponíveis:</h3>

        <div className="min-h-[80px] flex flex-wrap gap-2 items-center rounded-md p-2">
          {uncategorizedItems.length === 0 ? (
            <div className="flex items-center justify-center w-full text-blue-500 py-4">
              <CheckCircle className="w-5 h-5 mr-2" />
              <p className="text-sm">Todos os itens foram classificados</p>
            </div>
          ) : (
            uncategorizedItems.map((itemId) => (
              <motion.button
                key={itemId}
                onClick={() => handleSelectItem(itemId)}
                className={`p-3 rounded-md text-sm ${
                  selectedItem === itemId
                    ? "bg-blue-700 text-white shadow-md"
                    : "bg-white border border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                aria-label={`Selecionar item: ${getItemContent(itemId)}`}
                aria-pressed={selectedItem === itemId}
              >
                {getItemContent(itemId)}
              </motion.button>
            ))
          )}
        </div>
      </div>

      {/* Selected item indicator */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-100 p-3 rounded-lg border border-blue-300 text-center"
        >
          <p className="text-blue-800 font-medium">Item selecionado:</p>
          <p className="text-blue-700">{getItemContent(selectedItem)}</p>
          <p className="text-sm text-blue-600 mt-1">Clique em uma categoria abaixo para classificar este item</p>
        </motion.div>
      )}

      {/* Categories */}
      <div className="grid md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white border-2 border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-blue-700">{category.name}</h3>

              {selectedItem && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleAssignToCategory(category.id)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                >
                  <ArrowRight className="h-4 w-4 mr-1" /> Adicionar
                </Button>
              )}
            </div>

            <div className="min-h-[120px] rounded-md p-2 bg-gray-50 border border-gray-200">
              {categorizedItems[category.id].length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400 text-sm text-center my-auto p-4">Nenhum item nesta categoria</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {categorizedItems[category.id].map((itemId) => (
                    <motion.div
                      key={itemId}
                      className="p-3 rounded-md text-sm bg-white border border-blue-200 flex items-center gap-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>{getItemContent(itemId)}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveFromCategory(category.id, itemId)}
                        className="h-6 w-6 p-0 rounded-full hover:bg-red-100 hover:text-red-700"
                        aria-label={`Remover item ${getItemContent(itemId)} da categoria ${category.name}`}
                      >
                        <ArrowLeft className="h-3 w-3" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-6">
        {attemptedSubmit && !allItemsCategorized && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 flex items-center mb-3"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            <span className="text-sm">Por favor, classifique todos os itens antes de continuar</span>
          </motion.div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!allItemsCategorized}
          className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 h-auto transition-all duration-300 ${
            !allItemsCategorized ? "opacity-70" : "shadow-md hover:shadow-lg"
          }`}
          aria-label="Confirmar classificação dos itens"
        >
          Confirmar Classificação
        </Button>
      </div>
    </div>
  )
}


```

# components/interactions/chat-interaction.tsx

```tsx
"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, User, Bot } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

interface ChatInteractionProps {
  prompt: string
  onSubmit: (response: string) => void
}

export default function ChatInteraction({ prompt, onSubmit }: ChatInteractionProps) {
  const [messages, setMessages] = useState<{ role: "system" | "user"; content: string }[]>([
    { role: "system", content: prompt },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { colors } = useTheme()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])

    // Simulate typing indicator
    setIsTyping(true)

    // Clear input
    setInput("")

    // Submit the user's response after a short delay
    setTimeout(() => {
      setIsTyping(false)
      onSubmit(input.trim())
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-primary text-background p-3 border-b">
        <h3 className="font-medium text-slate-700">Simulação de Chat</h3>
      </div>

      <div className="h-[300px] overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === "user" ? "bg-slate-700 ml-2" : "bg-slate-500 mr-2"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={`p-3 rounded-lg ${
                  message.role === "user" ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-800"
                }`}
              >
                {message.content}
              </div>
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center mr-2">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="p-3 rounded-lg bg-slate-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-[bounce_1s_infinite]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-[bounce_1s_infinite_0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-[bounce_1s_infinite_0.4s]"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t">
        <div className="flex">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua resposta..."
            className="flex-grow resize-none"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            className="ml-2 bg-slate-700 hover:bg-slate-800 text-white"
            disabled={!input.trim() || isTyping}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}


```

# components/interactions/drag-drop-interaction.tsx

```tsx
"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { AlertCircle, CheckCircle } from "lucide-react"

// Memoized draggable item component to prevent unnecessary re-renders
const DraggableItem = memo(
  ({
    id,
    index,
    content,
    isDragging,
  }: {
    id: string
    index: number
    content: string
    isDragging: boolean
  }) => {
    return (
      <Draggable key={id} draggableId={id} index={index}>
        {(provided, snapshot) => (
          <motion.div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`p-3 rounded-md text-sm ${
              snapshot.isDragging
                ? "bg-blue-700 text-white shadow-lg scale-105 z-50"
                : "bg-white border border-blue-200 hover:border-blue-400 hover:bg-blue-50"
            }`}
            style={{
              ...provided.draggableProps.style,
              margin: "0 4px 4px 0",
              transform: snapshot.isDragging ? provided.draggableProps.style?.transform : "translate(0, 0)",
              transition: snapshot.isDragging ? "none" : "transform 0.2s ease-out",
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            aria-label={`Item: ${content}`}
          >
            {content}
          </motion.div>
        )}
      </Draggable>
    )
  },
)

DraggableItem.displayName = "DraggableItem"

interface DragDropInteractionProps {
  items: { id: string; content: string }[]
  categories: { id: string; name: string }[]
  onComplete: (result: Record<string, string[]>) => void
}

export default function DragDropInteraction({ items, categories, onComplete }: DragDropInteractionProps) {
  const [itemMap, setItemMap] = useState<Record<string, string[]>>(() => {
    const initialMap: Record<string, string[]> = { items: items.map((item) => item.id) }
    categories.forEach((category) => {
      initialMap[category.id] = []
    })
    return initialMap
  })

  const [isDragging, setIsDragging] = useState(false)
  const [allItemsAssigned, setAllItemsAssigned] = useState(false)
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  // Check if all items are assigned whenever itemMap changes
  useEffect(() => {
    setAllItemsAssigned(itemMap.items.length === 0)
    // Reset attempted submit when items change
    if (attemptedSubmit && itemMap.items.length === 0) {
      setAttemptedSubmit(false)
    }
  }, [itemMap, attemptedSubmit])

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      setIsDragging(false)
      const { source, destination } = result

      // Dropped outside a droppable area
      if (!destination) return

      // Same position
      if (source.droppableId === destination.droppableId && source.index === destination.index) return

      // Create copies of source and destination lists
      const sourceList = Array.from(itemMap[source.droppableId])
      const destList =
        source.droppableId === destination.droppableId ? sourceList : Array.from(itemMap[destination.droppableId])

      // Remove from source list
      const [removed] = sourceList.splice(source.index, 1)

      // Insert into destination list
      if (source.droppableId === destination.droppableId) {
        sourceList.splice(destination.index, 0, removed)
      } else {
        destList.splice(destination.index, 0, removed)
      }

      // Update state with animation
      setItemMap({
        ...itemMap,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destList,
      })
    },
    [itemMap],
  )

  const handleSubmit = useCallback(() => {
    if (!allItemsAssigned) {
      setAttemptedSubmit(true)
      return
    }

    // Filter out the 'items' category from the result
    const result = { ...itemMap }
    delete result.items
    onComplete(result)
  }, [allItemsAssigned, itemMap, onComplete])

  const getItemById = useCallback(
    (id: string) => {
      return items.find((item) => item.id === id)?.content || ""
    },
    [items],
  )

  return (
    <div className="space-y-6">
      <p className="text-sm text-blue-600 italic text-center mb-4">Arraste os itens para as categorias corretas</p>

      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {/* Items to be dragged */}
        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-100 mb-4">
          <h3 className="font-medium text-blue-700 mb-3">Itens disponíveis:</h3>
          <Droppable droppableId="items" direction="horizontal" isDropDisabled={false}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`min-h-[80px] flex flex-wrap gap-2 items-center ${
                  snapshot.isDraggingOver ? "bg-blue-100 border-2 border-dashed border-blue-300" : ""
                } rounded-md p-2 transition-colors duration-300`}
                aria-label="Lista de itens disponíveis"
                style={{
                  // Use hardware acceleration for smoother animations
                  transform: "translateZ(0)",
                  willChange: isDragging ? "transform" : "auto",
                }}
              >
                {itemMap.items.length === 0 ? (
                  <div className="flex items-center justify-center w-full text-blue-500 py-4">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <p className="text-sm">Todos os itens foram classificados</p>
                  </div>
                ) : (
                  itemMap.items.map((itemId, index) => (
                    <DraggableItem
                      key={itemId}
                      id={itemId}
                      index={index}
                      content={getItemById(itemId)}
                      isDragging={isDragging}
                    />
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white border-2 border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-700 mb-2">{category.name}</h3>
              <Droppable droppableId={category.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[120px] rounded-md p-2 ${
                      snapshot.isDraggingOver
                        ? "bg-blue-50 border-2 border-dashed border-blue-300"
                        : "bg-gray-50 border border-gray-200"
                    } transition-all duration-300`}
                    aria-label={`Categoria: ${category.name}`}
                    style={{
                      // Use hardware acceleration for smoother animations
                      transform: "translateZ(0)",
                      willChange: isDragging ? "transform" : "auto",
                    }}
                  >
                    {itemMap[category.id].length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400 text-sm text-center my-auto p-4">
                          {isDragging ? "Solte aqui" : "Arraste itens para cá"}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {itemMap[category.id].map((itemId, index) => (
                          <DraggableItem
                            key={itemId}
                            id={itemId}
                            index={index}
                            content={getItemById(itemId)}
                            isDragging={isDragging}
                          />
                        ))}
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <div className="flex flex-col items-center mt-6">
        {attemptedSubmit && !allItemsAssigned && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 flex items-center mb-3"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            <span className="text-sm">Por favor, classifique todos os itens antes de continuar</span>
          </motion.div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!allItemsAssigned}
          className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 h-auto transition-all duration-300 ${
            !allItemsAssigned ? "opacity-70" : "shadow-md hover:shadow-lg"
          }`}
          aria-label="Confirmar classificação dos itens"
        >
          Confirmar Classificação
        </Button>
      </div>
    </div>
  )
}


```

# components/interactions/hotspot-interaction.tsx

```tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface Hotspot {
  id: number
  x: number
  y: number
  size: number
  label: string
}

interface HotspotInteractionProps {
  image: string
  hotspots: Hotspot[]
  question: string
  onSelect: (hotspotId: number) => void
}

export default function HotspotInteraction({ image, hotspots, question, onSelect }: HotspotInteractionProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null)
  const [hoveredHotspot, setHoveredHotspot] = useState<number | null>(null)

  const handleHotspotClick = (id: number) => {
    setSelectedHotspot(id)
  }

  const handleSubmit = () => {
    if (selectedHotspot !== null) {
      onSelect(selectedHotspot)
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-purple-500 italic text-center">{question}</p>

      <div className="relative w-full aspect-video bg-purple-50 rounded-lg overflow-hidden">
        <img src={image || "/placeholder.svg"} alt="Scenario" className="w-full h-full object-cover" />

        {hotspots.map((hotspot) => (
          <motion.div
            key={hotspot.id}
            className={`absolute rounded-full cursor-pointer flex items-center justify-center
              ${
                selectedHotspot === hotspot.id
                  ? "bg-purple-600 text-white border-2 border-white"
                  : "bg-white bg-opacity-80 border border-purple-300 hover:bg-purple-100"
              }`}
            style={{
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
              width: `${hotspot.size}px`,
              height: `${hotspot.size}px`,
              transform: "translate(-50%, -50%)",
              zIndex: hoveredHotspot === hotspot.id || selectedHotspot === hotspot.id ? 10 : 1,
            }}
            onClick={() => handleHotspotClick(hotspot.id)}
            onMouseEnter={() => setHoveredHotspot(hotspot.id)}
            onMouseLeave={() => setHoveredHotspot(null)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: selectedHotspot === hotspot.id ? [1, 1.2, 1] : 1,
              boxShadow: selectedHotspot === hotspot.id ? "0 0 0 4px rgba(147, 51, 234, 0.3)" : "none",
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs font-bold">{hotspot.id}</span>

            {(hoveredHotspot === hotspot.id || selectedHotspot === hotspot.id) && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-2 rounded shadow-md text-xs text-purple-800 whitespace-nowrap z-20"
              >
                {hotspot.label}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Button
          onClick={handleSubmit}
          disabled={selectedHotspot === null}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8"
        >
          Confirmar Seleção
        </Button>
      </div>
    </div>
  )
}


```

# components/interactions/interaction-factory.tsx

```tsx
"use client"

import MultipleChoiceInteraction from "./multiple-choice-interaction"
import CategorySelectionInteraction from "./category-selection-interaction"
import SliderInteraction from "./slider-interaction"
import ChatInteraction from "./chat-interaction"
import SequenceOrderingInteraction from "./sequence-ordering-interaction"
import HotspotInteraction from "./hotspot-interaction"
import type { InteractionType } from "@/types/game"

const interactionComponents = {
  "multiple-choice": MultipleChoiceInteraction,
  "drag-drop": CategorySelectionInteraction,
  "slider": SliderInteraction,
  "chat": ChatInteraction,
  "timeline": SequenceOrderingInteraction,
  "hotspot": HotspotInteraction
} as const;

interface InteractionFactoryProps {
  type: InteractionType;
  options?: any[];
  items?: any[];
  categories?: string[];
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    label: string;
  };
  chatPrompt?: string;
  timelineEvents?: any[];
  hotspotImage?: string;
  hotspots?: any[];
  hotspotQuestion?: string;
  onSelect?: (value: any) => void;
  onSubmit?: (value: any) => void;
  onComplete?: (value: any) => void;
}

export const InteractionFactory = ({ type, ...props }: InteractionFactoryProps) => {
  const Component = interactionComponents[type];
  if (!Component) {
    return <div>Interaction type not supported</div>;
  }
  return <Component {...props} />;
}; 
```

# components/interactions/multiple-choice-interaction.tsx

```tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface MultipleChoiceInteractionProps {
  options: string[]
  onSelect: (selectedIndex: number) => void
}

export default function MultipleChoiceInteraction({ options, onSelect }: MultipleChoiceInteractionProps) {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const handleOptionClick = (index: number) => {
    setSelectedOption(index)
  }

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onSelect(selectedOption)
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500 italic text-center">O que você faria nesta situação?</p>

      <div className="space-y-4">
        {options.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <Button
              variant="outline"
              className={`w-full text-left justify-start p-4 h-auto transition-all duration-300 ${
                hoveredOption === index ? "bg-slate-50 border-slate-300" : ""
              } ${selectedOption === index ? "bg-blue-100 border-blue-400 ring-2 ring-blue-200" : ""}`}
              onClick={() => handleOptionClick(index)}
              onMouseEnter={() => setHoveredOption(index)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <div className="mr-3 flex-shrink-0">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedOption === index ? "border-blue-700 bg-blue-700 text-white" : "border-slate-500"
                  }`}
                >
                  <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                </div>
              </div>
              <span>{option}</span>
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button
          onClick={handleSubmit}
          disabled={selectedOption === null}
          className="bg-blue-700 hover:bg-blue-800 text-white px-8"
        >
          Confirmar Resposta
        </Button>
      </div>
    </div>
  )
}


```

# components/interactions/sequence-ordering-interaction.tsx

```tsx
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertCircle, ChevronUp, ChevronDown } from "lucide-react"

interface TimelineEvent {
  id: string
  content: string
}

interface SequenceOrderingProps {
  events: TimelineEvent[]
  onComplete: (orderedEvents: string[]) => void
}

export default function SequenceOrderingInteraction({ events, onComplete }: SequenceOrderingProps) {
  const [orderedEvents, setOrderedEvents] = useState<TimelineEvent[]>([...events])
  const [hasReordered, setHasReordered] = useState(false)
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  // Reset hasReordered when events change
  useEffect(() => {
    setHasReordered(false)
    setAttemptedSubmit(false)
  }, [events])

  // Function to move an event up in the sequence
  const moveUp = (index: number) => {
    if (index === 0) return

    const newOrderedEvents = [...orderedEvents]
    const temp = newOrderedEvents[index]
    newOrderedEvents[index] = newOrderedEvents[index - 1]
    newOrderedEvents[index - 1] = temp

    setOrderedEvents(newOrderedEvents)
    setHasReordered(true)

    // Reset attempted submit when user reorders
    if (attemptedSubmit) {
      setAttemptedSubmit(false)
    }
  }

  // Function to move an event down in the sequence
  const moveDown = (index: number) => {
    if (index === orderedEvents.length - 1) return

    const newOrderedEvents = [...orderedEvents]
    const temp = newOrderedEvents[index]
    newOrderedEvents[index] = newOrderedEvents[index + 1]
    newOrderedEvents[index + 1] = temp

    setOrderedEvents(newOrderedEvents)
    setHasReordered(true)

    // Reset attempted submit when user reorders
    if (attemptedSubmit) {
      setAttemptedSubmit(false)
    }
  }

  // Function to handle submission
  const handleSubmit = () => {
    if (!hasReordered) {
      setAttemptedSubmit(true)
      return
    }
    onComplete(orderedEvents.map((event) => event.id))
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-blue-600 italic text-center mb-4">
        Organize os eventos na ordem correta usando os botões para mover para cima ou para baixo
      </p>

      <div className="border-2 border-blue-200 rounded-lg p-4 bg-white">
        <div className="space-y-2">
          {orderedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="p-3 rounded-md border-2 bg-white border-blue-200 hover:border-blue-300"
              initial={{ opacity: 1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-medium text-blue-700">{index + 1}</span>
                </div>

                <div className="flex-1">{event.content}</div>

                <div className="flex flex-col ml-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className={`h-8 w-8 p-0 ${index === 0 ? "opacity-50" : "hover:bg-blue-100"}`}
                    aria-label={`Mover ${event.content} para cima`}
                  >
                    <ChevronUp className="h-5 w-5 text-blue-700" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveDown(index)}
                    disabled={index === orderedEvents.length - 1}
                    className={`h-8 w-8 p-0 ${index === orderedEvents.length - 1 ? "opacity-50" : "hover:bg-blue-100"}`}
                    aria-label={`Mover ${event.content} para baixo`}
                  >
                    <ChevronDown className="h-5 w-5 text-blue-700" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center mt-6">
        {attemptedSubmit && !hasReordered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 flex items-center mb-3"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            <span className="text-sm">Por favor, reordene os eventos antes de continuar</span>
          </motion.div>
        )}

        <Button
          onClick={handleSubmit}
          className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 h-auto transition-all duration-300 ${
            !hasReordered ? "opacity-70" : "shadow-md hover:shadow-lg"
          }`}
          aria-label="Confirmar ordem dos eventos"
        >
          Confirmar Ordem
        </Button>
      </div>
    </div>
  )
}


```

# components/interactions/slider-interaction.tsx

```tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface SliderInteractionProps {
  min: number
  max: number
  step: number
  label: string
  onSelect: (value: number) => void
}

export default function SliderInteraction({ min, max, step, label, onSelect }: SliderInteractionProps) {
  const [value, setValue] = useState<number[]>([Math.floor((max - min) / 2) + min])

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue)
  }

  const handleSubmit = () => {
    onSelect(value[0])
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-sm text-slate-500 italic mb-6">{label}</p>

        <div className="bg-slate-50 p-6 rounded-lg">
          <div className="text-center mb-8">
            <motion.div
              className="text-4xl font-bold text-slate-800"
              key={value[0]}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {value[0]}
            </motion.div>
          </div>

          <Slider
            defaultValue={value}
            max={max}
            min={min}
            step={step}
            onValueChange={handleValueChange}
            className="w-full"
          />

          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleSubmit} className="bg-slate-700 hover:bg-slate-800 text-white px-8">
          Confirmar Resposta
        </Button>
      </div>
    </div>
  )
}


```

# components/interactions/timeline-interaction.tsx

```tsx
"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { GripVertical, AlertCircle } from "lucide-react"

interface TimelineEvent {
  id: string
  content: string
}

// Memoized draggable event component to prevent unnecessary re-renders
const DraggableEvent = memo(({ event, index }: { event: TimelineEvent; index: number }) => {
  return (
    <Draggable key={event.id} draggableId={event.id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`p-3 rounded-md border-2 flex items-center ${
            snapshot.isDragging
              ? "bg-blue-100 border-blue-400 shadow-lg"
              : "bg-white border-blue-200 hover:border-blue-300"
          }`}
          initial={{ opacity: 1 }}
          animate={{
            scale: snapshot.isDragging ? 1.02 : 1,
            boxShadow: snapshot.isDragging ? "0 10px 25px -5px rgba(0, 0, 0, 0.1)" : "none",
          }}
          transition={{ duration: 0.2 }}
          aria-label={`Evento ${index + 1}: ${event.content}`}
          style={{
            ...provided.draggableProps.style,
            transform: snapshot.isDragging ? provided.draggableProps.style?.transform : "translate(0, 0)",
            transition: snapshot.isDragging ? "none" : "transform 0.2s ease-out",
          }}
        >
          <div
            {...provided.dragHandleProps}
            className="mr-2 p-1 rounded hover:bg-blue-100 cursor-grab active:cursor-grabbing"
            aria-label="Arrastar"
          >
            <GripVertical className="h-5 w-5 text-blue-500" />
          </div>

          <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-3">
            <span className="font-medium text-blue-700">{index + 1}</span>
          </div>

          <div className="flex-1">{event.content}</div>
        </motion.div>
      )}
    </Draggable>
  )
})

DraggableEvent.displayName = "DraggableEvent"

interface TimelineInteractionProps {
  events: TimelineEvent[]
  onComplete: (orderedEvents: string[]) => void
}

export default function TimelineInteraction({ events, onComplete }: TimelineInteractionProps) {
  const [orderedEvents, setOrderedEvents] = useState<TimelineEvent[]>([...events])
  const [isDragging, setIsDragging] = useState(false)
  const [hasReordered, setHasReordered] = useState(false)
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  // Reset hasReordered when events change
  useEffect(() => {
    setHasReordered(false)
    setAttemptedSubmit(false)
  }, [events])

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      setIsDragging(false)
      const { destination, source } = result

      if (!destination) return

      if (destination.droppableId === source.droppableId && destination.index === source.index) return

      const newOrderedEvents = Array.from(orderedEvents)
      const [removed] = newOrderedEvents.splice(source.index, 1)
      newOrderedEvents.splice(destination.index, 0, removed)

      setOrderedEvents(newOrderedEvents)
      setHasReordered(true)

      // Reset attempted submit when user reorders
      if (attemptedSubmit) {
        setAttemptedSubmit(false)
      }
    },
    [orderedEvents, attemptedSubmit],
  )

  const handleSubmit = useCallback(() => {
    if (!hasReordered) {
      setAttemptedSubmit(true)
      return
    }
    onComplete(orderedEvents.map((event) => event.id))
  }, [hasReordered, orderedEvents, onComplete])

  return (
    <div className="space-y-6">
      <p className="text-sm text-blue-600 italic text-center mb-4">
        Arraste os eventos para organizá-los na ordem correta
      </p>

      <div className="border-2 border-blue-200 rounded-lg p-4 bg-white">
        <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <Droppable droppableId="timeline" direction="vertical">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`space-y-2 ${snapshot.isDraggingOver ? "bg-blue-50 p-2 rounded-md" : ""}`}
                aria-label="Lista de eventos para ordenar"
                style={{
                  // Use hardware acceleration for smoother animations
                  transform: "translateZ(0)",
                  willChange: isDragging ? "transform" : "auto",
                }}
              >
                {orderedEvents.map((event, index) => (
                  <DraggableEvent key={event.id} event={event} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="flex flex-col items-center mt-6">
        {attemptedSubmit && !hasReordered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 flex items-center mb-3"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            <span className="text-sm">Por favor, reordene os eventos antes de continuar</span>
          </motion.div>
        )}

        <Button
          onClick={handleSubmit}
          className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 h-auto transition-all duration-300 ${
            !hasReordered ? "opacity-70" : "shadow-md hover:shadow-lg"
          }`}
          aria-label="Confirmar ordem dos eventos"
        >
          Confirmar Ordem
        </Button>
      </div>
    </div>
  )
}


```

# components/intro-screen.tsx

```tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, Brain, MessageCircle, ArrowRight } from "lucide-react"
import Image from "next/image"
import DifficultySelector from "./difficulty-selector"
import type { Difficulty } from "@/types/game"

interface IntroScreenProps {
  onStart: (difficulty: Difficulty) => void
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const [showDifficultySelector, setShowDifficultySelector] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blue-700" />,
      title: "Prevenção & Resposta",
      description: "Aprenda estratégias eficazes para prevenir e responder ao cyberbullying.",
    },
    {
      icon: <Brain className="h-8 w-8 text-blue-700" />,
      title: "Educação Digital",
      description: "Desenvolva competências para ajudar seus filhos a navegar com segurança online.",
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-700" />,
      title: "Comunicação Aberta",
      description: "Crie um ambiente de confiança para discutir experiências online.",
    },
  ]

  const steps = [
    {
      title: "O que é Cyberbullying?",
      content:
        "O cyberbullying é o uso de tecnologia digital para intimidar, humilhar ou agredir outra pessoa. " +
        "Isso inclui ameaças, mensagens ofensivas, compartilhamento de imagens constrangedoras e exclusão deliberada em ambientes online.",
    },
    {
      title: "Por que este jogo é importante?",
      content:
        "Os pais são a primeira linha de defesa contra o cyberbullying. " +
        "Este jogo apresenta situações reais e oferece orientações sobre como identificar, prevenir e responder " +
        "ao cyberbullying, ajudando você a proteger seus filhos no ambiente digital.",
    },
    {
      title: "Como jogar",
      content:
        "Você enfrentará cenários realistas e terá que tomar decisões sobre como agir. " +
        "Cada interação oferece feedback imediato sobre suas escolhas e explica as melhores práticas. " +
        "Acumule pontos, aprenda e se torne um especialista em proteção digital!",
    },
  ]

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowDifficultySelector(true)
    }
  }

  const handleDifficultySelect = (difficulty: Difficulty) => {
    onStart(difficulty)
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white text-center relative overflow-hidden">
        <motion.div
          className="absolute -right-10 -bottom-10 opacity-20"
          initial={{ rotate: -10, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Image src="/images/mascot-clipboard.png" alt="Mascot" width={150} height={150} />
        </motion.div>

        <motion.h1
          className="text-4xl font-bold mb-2 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Cyberbullying
        </motion.h1>
        <motion.p
          className="text-xl opacity-90 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Game educativo para prevenção e combate
        </motion.p>
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {!showDifficultySelector ? (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <Image
                    src="/images/mascot-dpo.png"
                    alt="DPO Mascot"
                    width={80}
                    height={80}
                    className="animate-bounce-slow"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-blue-700 mb-2">{steps[currentStep].title}</h2>
                  <p className="text-gray-700">{steps[currentStep].content}</p>
                </div>
              </div>

              {currentStep === 0 && (
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-blue-50 p-4 rounded-lg text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-blue-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.2, duration: 0.5 }}
                      whileHover={{ scale: 1.03 }}
                    >
                      <div className="flex justify-center mb-3">{feature.icon}</div>
                      <h3 className="font-semibold text-blue-800 mb-1">{feature.title}</h3>
                      <p className="text-sm text-blue-600">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="flex justify-center mt-6">
                <Button
                  onClick={handleNextStep}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {currentStep < steps.length - 1 ? "Próximo" : "Iniciar Jogo"} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <DifficultySelector onSelect={handleDifficultySelect} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}


```

# components/layout/about-page.tsx

```tsx
"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Shield, Scale, BookOpen } from "lucide-react"
import Image from "next/image"

interface AboutPageProps {
  onBack: () => void
}

export default function AboutPage({ onBack }: AboutPageProps) {
  return (
    <Card className="w-full overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white relative">
        <motion.h1
          className="text-3xl font-bold mb-2 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Sobre o Jogo
        </motion.h1>
        <motion.div
          className="absolute right-4 bottom-0 transform translate-y-1/3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Image src="/images/mascot-dpo.png" alt="DPO Mascot" width={80} height={80} />
        </motion.div>
      </div>

      <CardContent className="p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-800 mb-4">
              Cyberbullying: Game educativo para prevenção e combate
            </h2>
            <p className="text-gray-700 mb-4">
              Este jogo educativo foi desenvolvido pelo escritório Rafael Maciel Sociedade de Advogados com o objetivo
              de conscientizar pais e responsáveis sobre o cyberbullying, suas manifestações e como prevenir e combater
              esse problema que afeta crianças e adolescentes no ambiente digital.
            </p>
            <p className="text-gray-700 mb-4">
              Através de cenários realistas e interativos, o jogo apresenta situações comuns envolvendo cyberbullying e
              orienta sobre as melhores práticas para lidar com cada caso, sempre considerando aspectos legais,
              emocionais e educativos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Sobre o Escritório</h2>
            <div className="flex flex-col md:flex-row items-center mb-6">
              <div className="md:mr-6 mb-4 md:mb-0">
                <Image
                  src="/images/logo.png"
                  alt="Rafael Maciel Sociedade de Advogados"
                  width={200}
                  height={80}
                  className="rounded-md"
                />
              </div>
              <div>
                <p className="text-gray-700">
                  O escritório Rafael Maciel Sociedade de Advogados é especializado em Direito Digital, Proteção de
                  Dados e Cibersegurança, atuando na orientação jurídica e na proteção dos direitos de pessoas e
                  empresas no ambiente digital.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <motion.div
                className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-3">
                  <Shield className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="font-semibold text-blue-800 mb-1 text-center">Proteção Digital</h3>
                <p className="text-sm text-blue-600 text-center">
                  Orientação jurídica para proteção contra crimes cibernéticos e violações de direitos no ambiente
                  digital.
                </p>
              </motion.div>

              <motion.div
                className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-3">
                  <Scale className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="font-semibold text-blue-800 mb-1 text-center">Aspectos Legais</h3>
                <p className="text-sm text-blue-600 text-center">
                  Suporte jurídico especializado em casos de cyberbullying e outras formas de violência digital.
                </p>
              </motion.div>

              <motion.div
                className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-3">
                  <BookOpen className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="font-semibold text-blue-800 mb-1 text-center">Educação Digital</h3>
                <p className="text-sm text-blue-600 text-center">
                  Iniciativas educativas para promover o uso seguro e responsável da internet.
                </p>
              </motion.div>
            </div>

            <div className="flex justify-center">
              <a
                href="https://www.rafaelmaciel.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                Visite nosso site <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </section>

          <div className="flex justify-start">
            <Button
              onClick={onBack}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              aria-label="Voltar para o jogo"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o jogo
            </Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}


```

# components/layout/navigation.tsx

```tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Info, HelpCircle } from "lucide-react"
import { ThemeSelector } from "@/components/theme-selector"

interface NavigationProps {
  onNavigate: (page: string) => void
  currentPage: string
}

export default function Navigation({ onNavigate, currentPage }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleNavigate = (page: string) => {
    onNavigate(page)
    setIsOpen(false)
  }

  const navItems = [
    { id: "home", label: "Início", icon: <Home className="h-5 w-5" /> },
    { id: "about", label: "Sobre", icon: <Info className="h-5 w-5" /> },
    { id: "help", label: "Ajuda", icon: <HelpCircle className="h-5 w-5" /> },
  ]

  return (
    <nav className="flex items-center justify-between p-4">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMenu}
        className="fixed top-4 right-4 bg-white shadow-md border-blue-200 z-50"
        aria-expanded={isOpen}
        aria-label="Menu de navegação"
      >
        {isOpen ? <X className="h-5 w-5 text-blue-700" /> : <Menu className="h-5 w-5 text-blue-700" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full bg-white shadow-lg w-64 p-4 pt-16"
          >
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left p-3 ${
                      currentPage === item.id
                        ? "bg-blue-100 text-blue-800 font-medium"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                    onClick={() => handleNavigate(item.id)}
                    aria-current={currentPage === item.id ? "page" : undefined}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>

            <div className="absolute bottom-8 left-0 right-0 px-4">
              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className="text-xs text-gray-500 text-center">
                  © {new Date().getFullYear()} Rafael Maciel Sociedade de Advogados
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      <ThemeSelector />
    </nav>
  )
}


```

# components/loading-screen.tsx

```tsx
"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Image src="/images/mascot-clipboard.png" alt="Loading" width={30} height={30} />
        </motion.div>
      </div>
      <p className="mt-4 text-purple-700 font-medium">Carregando...</p>
    </div>
  )
}


```

# components/progress-bar.tsx

```tsx
"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full max-w-xs bg-purple-200 rounded-full h-2.5 overflow-hidden">
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2.5"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}


```

# components/results-screen.tsx

```tsx
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, RotateCcw, Download, Award, ExternalLink } from "lucide-react"
import type { Scenario, Answer, Difficulty } from "@/types/game"
import Image from "next/image"

interface ResultsScreenProps {
  score: number
  answers: Answer[]
  scenarios: Scenario[]
  difficulty: Difficulty
  onRestart: () => void
}

export default function ResultsScreen({ score, answers, scenarios, difficulty, onRestart }: ResultsScreenProps) {
  const [showCertificate, setShowCertificate] = useState(false)
  const [showResources, setShowResources] = useState(false)

  const totalPossibleScore =
    scenarios.length * (difficulty === "beginner" ? 10 : difficulty === "intermediate" ? 15 : 20)
  const percentage = totalPossibleScore > 0 ? Math.round((score / totalPossibleScore) * 100) : 0

  useEffect(() => {
    // Trigger confetti for good scores
    if (percentage >= 70) {
      import("canvas-confetti").then((confetti) => {
        const duration = 3 * 1000
        const end = Date.now() + duration

        const colors = ["#7c3aed", "#8b5cf6", "#a78bfa"]
        ;(function frame() {
          confetti.default({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
          })

          confetti.default({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
          })

          if (Date.now() < end) {
            requestAnimationFrame(frame)
          }
        })()
      })
    }
  }, [percentage])

  let message = ""
  if (percentage >= 90) {
    message = "Excelente! Você está muito bem preparado para ajudar seus filhos a lidar com o cyberbullying!"
  } else if (percentage >= 70) {
    message = "Muito bom! Você tem bons conhecimentos sobre prevenção e resposta ao cyberbullying."
  } else if (percentage >= 50) {
    message = "Bom trabalho! Você está no caminho certo, mas ainda há espaço para aprender mais."
  } else {
    message = "Continue aprendendo! A proteção das crianças contra o cyberbullying é um tema importante."
  }

  const getScenarioById = (id: string): Scenario | undefined => {
    return scenarios.find((s) => s.id === id)
  }

  const resources = [
    {
      title: "SaferNet Brasil",
      description: "Portal com informações e canais de denúncia para violações online",
      url: "https://new.safernet.org.br/",
    },
    {
      title: "Cartilha de Segurança para Internet",
      description: "Material educativo sobre segurança online do CERT.br",
      url: "https://cartilha.cert.br/",
    },
    {
      title: "Canal de Ajuda",
      description: "Serviço de atendimento a vítimas de violência online",
      url: "https://new.safernet.org.br/helpline",
    },
  ]

  return (
    <Card className="w-full overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white text-center relative">
        <motion.div
          className="absolute right-4 bottom-0 transform translate-y-1/3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Image src="/images/mascot-dpo.png" alt="DPO Mascot" width={80} height={80} />
        </motion.div>

        <motion.h2
          className="text-3xl font-bold mb-2 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Resultados
        </motion.h2>
      </div>

      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-blue-100 mb-4 relative">
            <span className="text-3xl font-bold text-blue-700">{percentage}%</span>
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#0078c8"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${percentage * 2.83} 283`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
                initial={{ strokeDasharray: "0 283" }}
                animate={{ strokeDasharray: `${percentage * 2.83} 283` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </svg>
          </div>

          <h3 className="text-xl font-semibold mb-2">
            Você marcou {score} de {totalPossibleScore} pontos possíveis
          </h3>

          <p className="text-gray-600 mb-6">{message}</p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-6"
          >
            {percentage >= 70 && (
              <Button
                variant="outline"
                className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                onClick={() => setShowCertificate(!showCertificate)}
              >
                <Award className="h-4 w-4" />
                {showCertificate ? "Ocultar Certificado" : "Ver Certificado"}
              </Button>
            )}

            <Button
              variant="outline"
              className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={() => setShowResources(!showResources)}
            >
              <ExternalLink className="h-4 w-4" />
              {showResources ? "Ocultar Recursos" : "Recursos Adicionais"}
            </Button>
          </motion.div>

          {showCertificate && (
            <motion.div
              className="mb-6 p-6 border-2 border-blue-200 rounded-lg bg-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center relative p-8 border-4 border-blue-700">
                <div className="absolute top-4 left-4">
                  <Image src="/images/logo.png" alt="Rafael Maciel Sociedade de Advogados" width={100} height={40} />
                </div>

                <h3 className="text-2xl font-bold text-blue-800 mb-2 mt-10">Certificado de Conclusão</h3>
                <p className="text-lg mb-4">Cyberbullying: Game educativo para prevenção e combate</p>
                <p className="mb-6">
                  Este certificado reconhece que você completou com sucesso o treinamento sobre prevenção e resposta ao
                  cyberbullying.
                </p>
                <p className="text-sm text-blue-500 mb-4">{new Date().toLocaleDateString()}</p>

                <div className="flex justify-center">
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="mr-2 h-4 w-4" /> Baixar Certificado
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {showResources && (
            <motion.div
              className="mb-6 p-6 border-2 border-purple-200 rounded-lg bg-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-purple-800">Recursos para Combate ao Cyberbullying</h3>
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <motion.a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <div className="flex items-center">
                      <div className="mr-3">
                        <ExternalLink className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-700">{resource.title}</h4>
                        <p className="text-sm text-purple-600">{resource.description}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-purple-800">Resumo das Respostas</h3>

          <div className="space-y-4">
            {answers.map((answer, index) => {
              const scenario = getScenarioById(answer.scenarioId)
              return scenario ? (
                <motion.div
                  key={index}
                  className="p-4 border border-purple-200 rounded-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {answer.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium mb-1">{scenario.text}</p>
                      <p className="text-sm text-gray-600 mb-1">
                        {answer.isCorrect ? scenario.correctFeedback : scenario.incorrectFeedback}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : null
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={onRestart} className="bg-blue-600 hover:bg-blue-700 text-white">
            <RotateCcw className="mr-2 h-4 w-4" /> Jogar Novamente
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


```

# components/scenario-card.tsx

```tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Scenario } from "@/types/game"

interface ScenarioCardProps {
  scenario: Scenario
  onSelectOption: (optionIndex: number) => void
}

export default function ScenarioCard({ scenario, onSelectOption }: ScenarioCardProps) {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null)

  return (
    <Card className="w-full overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <h2 className="text-2xl font-bold text-white">Cenário</h2>
      </div>

      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">{scenario.icon}</div>
          </div>

          <p className="text-lg text-gray-800 text-center mb-2">{scenario.text}</p>
          <p className="text-sm text-gray-500 text-center italic">O que você faria nesta situação?</p>
        </motion.div>

        <div className="space-y-4">
          {scenario.options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Button
                variant="outline"
                className={`w-full text-left justify-start p-4 h-auto transition-all duration-300 ${
                  hoveredOption === index ? "bg-blue-50 border-blue-300" : ""
                }`}
                onClick={() => onSelectOption(index)}
                onMouseEnter={() => setHoveredOption(index)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <div className="mr-3 flex-shrink-0">
                  <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">{String.fromCharCode(65 + index)}</span>
                  </div>
                </div>
                <span>{option}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


```

# components/scenario-screen.tsx

```tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { Scenario, Difficulty, Answer } from "@/types/game"
import CategorySelectionInteraction from "./interactions/category-selection-interaction"
import SliderInteraction from "./interactions/slider-interaction"
import ChatInteraction from "./interactions/chat-interaction"
import MultipleChoiceInteraction from "./interactions/multiple-choice-interaction"
import SequenceOrderingInteraction from "./interactions/sequence-ordering-interaction"
import HotspotInteraction from "./interactions/hotspot-interaction"
import FeedbackPanel from "./feedback-panel"
import Image from "next/image"

interface ScenarioScreenProps {
  scenario: Scenario
  onComplete: (result: Answer) => void
  difficulty: Difficulty
}

export default function ScenarioScreen({ scenario, onComplete, difficulty }: ScenarioScreenProps) {
  const [userAnswer, setUserAnswer] = useState<any>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmitAnswer = (answer: any) => {
    setUserAnswer(answer)

    // Evaluate if answer is correct based on interaction type
    let correct = false

    switch (scenario.interactionType) {
      case "multiple-choice":
        correct = answer === scenario.correctAnswer
        break
      case "drag-drop": // Now using category-selection
        correct = JSON.stringify(answer) === JSON.stringify(scenario.correctAnswer)
        break
      case "slider":
        // For slider, we consider correct if within a range
        const targetValue = scenario.correctAnswer as number
        const tolerance = difficulty === "beginner" ? 20 : difficulty === "intermediate" ? 15 : 10
        correct = Math.abs(answer - targetValue) <= tolerance
        break
      case "chat":
        // For chat, we check if all required keywords are present
        const requiredKeywords = scenario.correctAnswer as string[]
        const answerLower = answer.toLowerCase()
        correct = requiredKeywords.every((keyword) => answerLower.includes(keyword.toLowerCase()))
        break
      case "timeline": // Now using sequence-ordering
        correct = JSON.stringify(answer) === JSON.stringify(scenario.correctAnswer)
        break
      case "hotspot":
        correct = answer === scenario.correctAnswer
        break
    }

    setIsCorrect(correct)
    setShowFeedback(true)
  }

  const handleContinue = () => {
    onComplete({
      scenarioId: scenario.id,
      userAnswer,
      isCorrect,
      interactionType: scenario.interactionType,
    })
  }

  const handleBackToQuestion = () => {
    setShowFeedback(false)
  }

  const renderInteraction = () => {
    switch (scenario.interactionType) {
      case "multiple-choice":
        return <MultipleChoiceInteraction options={scenario.options} onSelect={handleSubmitAnswer} />
      case "drag-drop":
        // Replace drag-drop with category selection
        return (
          <CategorySelectionInteraction
            items={scenario.items}
            categories={scenario.categories}
            onComplete={handleSubmitAnswer}
          />
        )
      case "slider":
        return (
          <SliderInteraction
            min={scenario.sliderConfig?.min || 0}
            max={scenario.sliderConfig?.max || 100}
            step={scenario.sliderConfig?.step || 1}
            label={scenario.sliderConfig?.label || ""}
            onSelect={handleSubmitAnswer}
          />
        )
      case "chat":
        return <ChatInteraction prompt={scenario.chatPrompt || ""} onSubmit={handleSubmitAnswer} />
      case "timeline":
        // Replace timeline with sequence ordering
        return <SequenceOrderingInteraction events={scenario.timelineEvents || []} onComplete={handleSubmitAnswer} />
      case "hotspot":
        return (
          <HotspotInteraction
            image={scenario.hotspotImage || ""}
            hotspots={scenario.hotspots || []}
            question={scenario.hotspotQuestion || ""}
            onSelect={handleSubmitAnswer}
          />
        )
      default:
        return <div>Interaction type not supported</div>
    }
  }

  return (
    <Card className="w-full overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white relative">
        <h2 className="text-2xl font-bold">Cenário</h2>
        {scenario.mascot && (
          <div className="absolute right-4 bottom-0 transform translate-y-1/2">
            <Image
              src={`/images/mascot-${scenario.mascot}.png`}
              alt="Mascot"
              width={70}
              height={70}
              className="drop-shadow-lg"
            />
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {!showFeedback ? (
            <motion.div
              key="scenario"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className="mb-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    {scenario.icon}
                  </div>
                </div>

                <p className="text-lg text-gray-800 text-center mb-4">{scenario.text}</p>

                {scenario.context && (
                  <div className="bg-blue-50 p-4 rounded-md mb-6 text-sm text-blue-600 border border-blue-100">
                    {scenario.context}
                  </div>
                )}
              </div>

              <div className={`w-full ${scenario.interactionType === "drag-drop" ? "max-w-3xl mx-auto" : ""}`}>
                {renderInteraction()}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FeedbackPanel
                scenario={scenario}
                userAnswer={userAnswer}
                isCorrect={isCorrect}
                onContinue={handleContinue}
                onBack={handleBackToQuestion}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}


```

# components/score-display.tsx

```tsx
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Award } from "lucide-react"
import type { Difficulty } from "@/types/game"

interface ScoreDisplayProps {
  score: number
  difficulty: Difficulty
  previousScore?: number
}

export default function ScoreDisplay({ score, difficulty, previousScore }: ScoreDisplayProps) {
  const difficultyLabel =
    difficulty === "beginner" ? "Iniciante" : difficulty === "intermediate" ? "Intermediário" : "Avançado"

  const pointsPerQuestion = difficulty === "beginner" ? 10 : difficulty === "intermediate" ? 15 : 20

  const isScoreIncreased = previousScore !== undefined && score > previousScore

  return (
    <div className="relative">
      <motion.div
        className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Award className="h-5 w-5 text-blue-700 mr-2" />
        <span className="font-medium text-blue-900">{score} pontos</span>
        <span className="ml-2 text-xs bg-blue-100 px-2 py-0.5 rounded-full text-blue-600">{difficultyLabel}</span>
      </motion.div>

      {/* Score increase animation */}
      <AnimatePresence>
        {isScoreIncreased && (
          <motion.div
            className="absolute -top-5 right-0 text-green-500 font-bold"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            +{pointsPerQuestion}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


```

# components/theme-provider.tsx

```tsx
'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

```

# components/theme-selector.tsx

```tsx
"use client"

import { useTheme } from "@/contexts/theme-context"
import { themes, ThemeType } from "@/lib/themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Palette } from "lucide-react"

export function ThemeSelector() {
  const { currentTheme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(themes) as ThemeType[]).map((theme) => (
          <DropdownMenuItem
            key={theme}
            onClick={() => setTheme(theme)}
            className={currentTheme === theme ? "bg-accent" : ""}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
```

# components/ui/accordion.tsx

```tsx
"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

```

# components/ui/alert-dialog.tsx

```tsx
"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

```

# components/ui/alert.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

```

# components/ui/aspect-ratio.tsx

```tsx
"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }

```

# components/ui/avatar.tsx

```tsx
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

```

# components/ui/badge.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```

# components/ui/breadcrumb.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

```

# components/ui/button.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

# components/ui/calendar.tsx

```tsx
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

```

# components/ui/card.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

# components/ui/carousel.tsx

```tsx
"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

```

# components/ui/chart.tsx

```tsx
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}

```

# components/ui/checkbox.tsx

```tsx
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

```

# components/ui/collapsible.tsx

```tsx
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

```

# components/ui/command.tsx

```tsx
"use client"

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

```

# components/ui/context-menu.tsx

```tsx
"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}

```

# components/ui/dialog.tsx

```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

```

# components/ui/drawer.tsx

```tsx
"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

```

# components/ui/dropdown-menu.tsx

```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

```

# components/ui/form.tsx

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

# components/ui/hover-card.tsx

```tsx
"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }

```

# components/ui/input-otp.tsx

```tsx
"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

```

# components/ui/input.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```

# components/ui/label.tsx

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```

# components/ui/menubar.tsx

```tsx
"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const MenubarMenu = MenubarPrimitive.Menu

const MenubarGroup = MenubarPrimitive.Group

const MenubarPortal = MenubarPrimitive.Portal

const MenubarSub = MenubarPrimitive.Sub

const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}

```

# components/ui/navigation-menu.tsx

```tsx
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}

```

# components/ui/pagination.tsx

```tsx
import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}

```

# components/ui/popover.tsx

```tsx
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }

```

# components/ui/progress.tsx

```tsx
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

```

# components/ui/radio-group.tsx

```tsx
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }

```

# components/ui/resizable.tsx

```tsx
"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

```

# components/ui/scroll-area.tsx

```tsx
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }

```

# components/ui/select.tsx

```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

```

# components/ui/separator.tsx

```tsx
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

```

# components/ui/sheet.tsx

```tsx
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

# components/ui/sidebar.tsx

```tsx
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [setOpenProp, open]
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className="group peer hidden md:block text-sidebar-foreground"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
          )}
        />
        <div
          className={cn(
            "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      )}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state } = useSidebar()

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )

    if (!tooltip) {
      return button
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      }
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    showOnHover?: boolean
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("rounded-md h-8 flex gap-2 px-2 items-center", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 flex-1 max-w-[--skeleton-width]"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean
    size?: "sm" | "md"
    isActive?: boolean
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

```

# components/ui/skeleton.tsx

```tsx
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }

```

# components/ui/slider.tsx

```tsx
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

```

# components/ui/sonner.tsx

```tsx
"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

```

# components/ui/switch.tsx

```tsx
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

```

# components/ui/table.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

# components/ui/tabs.tsx

```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

# components/ui/textarea.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

```

# components/ui/toast.tsx

```tsx
"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}

```

# components/ui/toaster.tsx

```tsx
"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

```

# components/ui/toggle-group.tsx

```tsx
"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }

```

# components/ui/toggle.tsx

```tsx
"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3 min-w-10",
        sm: "h-9 px-2.5 min-w-9",
        lg: "h-11 px-5 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }

```

# components/ui/tooltip.tsx

```tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```

# components/ui/use-mobile.tsx

```tsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

```

# components/ui/use-toast.ts

```ts
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

```

# contexts/theme-context.tsx

```tsx
"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { themes, ThemeType, ThemeColors } from '@/lib/themes'

interface ThemeContextType {
  currentTheme: ThemeType
  colors: ThemeColors
  setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('default')

  useEffect(() => {
    // Apply theme colors to CSS variables
    const root = document.documentElement
    Object.entries(themes[currentTheme]).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })
  }, [currentTheme])

  const value = {
    currentTheme,
    colors: themes[currentTheme],
    setTheme: setCurrentTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

# data/cyberbullying-scenarios.tsx

```tsx
import { Smartphone, MessageCircle, School, Users, Globe, FileWarning } from "lucide-react"
import type { Scenario } from "@/types/game"

export const cyberbullyingScenarios: Scenario[] = [
  {
    id: "upset-child",
    text: "Seu filho de 10 anos parece muito chateado depois de usar o celular. Ao perguntar o que aconteceu, ele se esquiva e não quer falar.",
    icon: <Smartphone className="h-10 w-10 text-blue-700" />,
    difficulty: "beginner",
    interactionType: "multiple-choice",
    options: [
      "Respeitar o espaço dele e esperar que ele decida falar quando estiver pronto.",
      "Tirar o celular dele como medida preventiva até descobrir o que aconteceu.",
      "Conversar em um momento calmo, demonstrando apoio e observando seu comportamento.",
      "Verificar o celular dele sem permissão para descobrir o que está acontecendo.",
    ],
    correctAnswer: 2,
    correctFeedback:
      "Excelente escolha! Abordar a situação com calma, demonstrando apoio e disponibilidade para ouvir é fundamental. Estabelecer esse diálogo aberto ajuda seu filho a se sentir seguro para compartilhar o que está acontecendo online.",
    incorrectFeedback:
      "Esta abordagem pode não ser a mais eficaz. É importante criar um ambiente de confiança onde seu filho se sinta seguro para compartilhar suas experiências online. Verificar o celular sem permissão ou simplesmente tirar o acesso pode prejudicar a relação de confiança.",
    additionalInfo:
      "Mudanças de comportamento, como tristeza, ansiedade ou evitar usar o celular ou ir à escola, podem ser sinais de cyberbullying. Observe padrões e estabeleça uma comunicação aberta e sem julgamentos para que seu filho se sinta confortável em compartilhar suas experiências online.",
    legalInfo:
      "A Lei 13.185/2015 institui o Programa de Combate à Intimidação Sistemática, que inclui o cyberbullying. Ela estabelece que pais têm papel fundamental na identificação precoce e no apoio às vítimas.",
    mascot: "dpo",
    context:
      "Seu filho normalmente é comunicativo e gosta de compartilhar suas experiências. Esta mudança de comportamento é recente e coincide com o aumento do uso do celular.",
  },
  {
    id: "social-media-anxiety",
    text: "Você percebe que seu filho adolescente está passando muitas horas nas redes sociais e parece ansioso sempre que recebe notificações.",
    icon: <MessageCircle className="h-10 w-10 text-blue-700" />,
    difficulty: "beginner",
    interactionType: "hotspot",
    hotspotImage: "/placeholder.svg?height=400&width=800",
    hotspotQuestion: "Qual destas abordagens é mais recomendada como primeiro passo?",
    hotspots: [
      {
        id: 1,
        x: 25,
        y: 30,
        size: 40,
        label: "Estabelecer limites rigorosos de tempo de tela imediatamente",
      },
      {
        id: 2,
        x: 75,
        y: 30,
        size: 40,
        label: "Conversar abertamente sobre uso saudável das redes sociais",
      },
      {
        id: 3,
        x: 25,
        y: 70,
        size: 40,
        label: "Monitorar secretamente todas as atividades nas redes sociais",
      },
      {
        id: 4,
        x: 75,
        y: 70,
        size: 40,
        label: "Proibir completamente o uso de redes sociais",
      },
    ],
    correctAnswer: 2,
    correctFeedback:
      "Perfeito! Iniciar com uma conversa aberta sobre o uso saudável das redes sociais estabelece uma base de confiança. Você pode discutir como as redes sociais podem afetar o bem-estar emocional e ajudar seu filho a desenvolver uma relação mais equilibrada com a tecnologia.",
    incorrectFeedback:
      "Esta não é a melhor primeira abordagem. Começar com uma conversa aberta sobre o uso saudável das redes sociais é mais eficaz para construir confiança e compreensão mútua antes de implementar regras ou restrições.",
    additionalInfo:
      "O uso excessivo de redes sociais está associado a problemas de ansiedade e depressão em adolescentes. Ajude seu filho a estabelecer limites saudáveis, incentive atividades offline e ensine-o a reconhecer quando o uso da tecnologia está afetando negativamente seu bem-estar.",
    mascot: "clipboard",
    context:
      "As redes sociais são parte importante da vida social dos adolescentes, mas precisam ser usadas de forma equilibrada e saudável.",
  },
  {
    id: "offensive-messages",
    text: "Um amigo comenta que viu mensagens ofensivas sobre seu filho em um grupo online de colegas da escola.",
    icon: <Users className="h-10 w-10 text-blue-700" />,
    difficulty: "intermediate",
    interactionType: "timeline",
    timelineEvents: [
      { id: "evidence", content: "Capturar e salvar evidências (prints, mensagens)" },
      { id: "talk", content: "Conversar com seu filho sobre a situação" },
      { id: "school", content: "Comunicar à escola sobre o ocorrido" },
      { id: "report", content: "Reportar o conteúdo à plataforma onde ocorreu" },
      { id: "follow", content: "Acompanhar o bem-estar emocional do seu filho" },
    ],
    correctAnswer: ["talk", "evidence", "school", "report", "follow"],
    correctFeedback:
      "Excelente sequência! Primeiro conversar com seu filho para entender a situação e oferecer apoio emocional, depois documentar as evidências, comunicar à escola, reportar à plataforma e continuar acompanhando o bem-estar do seu filho são os passos adequados.",
    incorrectFeedback:
      "A ordem das ações é importante. Começar conversando com seu filho para entender a situação e oferecer apoio emocional é fundamental antes de tomar outras medidas.",
    additionalInfo:
      "Documentar evidências de cyberbullying é crucial para que as autoridades escolares e, se necessário, as autoridades legais possam tomar medidas apropriadas. Prints de tela, mensagens, comentários ou e-mails devem ser salvos com data e hora. Manter um registro detalhado fortalece o caso.",
    legalInfo:
      "No Brasil, a Lei 13.185/2015 e a Lei 13.663/2018 obrigam as escolas a prevenir e combater o bullying e o cyberbullying. A escola tem responsabilidade legal de investigar e tomar providências quando informada sobre casos envolvendo seus alunos.",
    mascot: "dpo",
  },
  {
    id: "new-social-network",
    text: "Seu filho mais novo pede para criar um perfil em uma nova rede social que você nunca ouviu falar.",
    icon: <Globe className="h-10 w-10 text-blue-700" />,
    difficulty: "intermediate",
    interactionType: "drag-drop",
    items: [
      { id: "research", content: "Pesquisar sobre a rede social e seus riscos potenciais" },
      { id: "age", content: "Verificar a idade mínima recomendada para a plataforma" },
      { id: "privacy", content: "Examinar as configurações de privacidade disponíveis" },
      { id: "monitor", content: "Monitorar todas as atividades sem o conhecimento da criança" },
      { id: "refuse", content: "Negar o pedido sem explicação" },
      { id: "together", content: "Explorar a plataforma junto com seu filho" },
    ],
    categories: [
      { id: "recommended", name: "Ações Recomendadas" },
      { id: "not-recommended", name: "Ações Não Recomendadas" },
    ],
    correctAnswer: {
      recommended: ["research", "age", "privacy", "together"],
      "not-recommended": ["monitor", "refuse"],
    },
    correctFeedback:
      "Ótima classificação! Pesquisar sobre a rede, verificar a idade mínima, examinar as configurações de privacidade e explorar a plataforma junto com seu filho são abordagens que combinam segurança com respeito e educação digital.",
    incorrectFeedback:
      "Revise sua classificação. Monitorar secretamente ou negar sem explicação não são práticas recomendadas, pois não educam a criança sobre segurança digital e podem prejudicar a confiança.",
    additionalInfo:
      "Muitas redes sociais têm idade mínima de 13 anos devido à lei americana COPPA (Children's Online Privacy Protection Act). Explorar novas plataformas junto com seus filhos é uma oportunidade para educá-los sobre privacidade, segurança e comportamento online responsável.",
    mascot: "clipboard",
  },
  {
    id: "school-cyberbullying",
    text: "A escola do seu filho enviou um comunicado sobre um caso de cyberbullying envolvendo alunos da mesma turma.",
    icon: <School className="h-10 w-10 text-blue-700" />,
    difficulty: "advanced",
    interactionType: "chat",
    chatPrompt:
      "Olá! Sou um especialista em cyberbullying e gostaria de saber como você abordaria essa situação com seu filho. Que pontos você considera importantes discutir?",
    correctAnswer: ["conversa", "empatia", "posicionamento", "denúncia", "apoio", "prevenção"],
    correctFeedback:
      "Excelente resposta! Você abordou pontos fundamentais como ter uma conversa aberta, promover empatia, discutir a importância de se posicionar contra o cyberbullying, explicar como denunciar, oferecer apoio e trabalhar em estratégias preventivas.",
    incorrectFeedback:
      "Sua resposta poderia incluir mais elementos importantes como: promover uma conversa aberta, desenvolver empatia, discutir a importância de se posicionar contra o cyberbullying (sem participar ou compartilhar), explicar como denunciar casos, oferecer apoio e desenvolver estratégias preventivas.",
    additionalInfo:
      "Casos de cyberbullying na escola impactam todo o ambiente escolar, mesmo alunos que não estão diretamente envolvidos. Estes momentos são oportunidades valiosas para educar as crianças sobre empatia digital, responsabilidade online e a importância de não serem espectadores passivos.",
    legalInfo:
      "As escolas têm responsabilidade legal de implementar ações de prevenção e combate ao bullying, incluindo o cyberbullying. A Lei 13.185/2015 e a Lei 13.663/2018 exigem que as escolas adotem medidas de conscientização, prevenção e combate ao bullying em todas as suas formas.",
    mascot: "dpo",
  },
  {
    id: "intimate-photos",
    text: "Você descobre que seu filho adolescente está sendo pressionado por colegas a enviar fotos íntimas em um aplicativo de mensagens.",
    icon: <FileWarning className="h-10 w-10 text-blue-700" />,
    difficulty: "advanced",
    interactionType: "multiple-choice",
    options: [
      "Confrontar os colegas que estão fazendo a pressão diretamente.",
      "Proibir completamente o uso de aplicativos de mensagens pelo seu filho.",
      "Conversar seriamente sobre os riscos legais e emocionais, oferecer apoio e reportar o caso às autoridades apropriadas.",
      "Ignorar a situação, pois provavelmente é apenas uma brincadeira entre adolescentes.",
    ],
    correctAnswer: 2,
    correctFeedback:
      "Perfeito! É fundamental abordar a situação com seriedade, explicando os riscos do compartilhamento de imagens íntimas, oferecendo apoio emocional, e envolvendo as autoridades apropriadas como a escola ou, se necessário, as autoridades legais.",
    incorrectFeedback:
      "Esta não é a melhor abordagem. É essencial conversar seriamente com seu filho sobre os riscos legais e emocionais envolvidos, oferecer apoio incondicional e, dependendo da gravidade, reportar o caso às autoridades apropriadas.",
    additionalInfo:
      "O sexting (envio de mensagens e imagens íntimas) entre adolescentes é mais comum do que muitos pais imaginam. A pressão dos colegas pode ser intensa. Ensine seus filhos que nunca devem ceder a esse tipo de pressão e que podem sempre buscar ajuda com um adulto de confiança.",
    legalInfo:
      "No Brasil, a produção, posse ou compartilhamento de imagens íntimas de menores de 18 anos é considerada pornografia infantil, mesmo se produzidas ou compartilhadas pelos próprios adolescentes. O Estatuto da Criança e do Adolescente (ECA) prevê penas severas para esses crimes.",
    context:
      "A pressão de pares para enviar fotos íntimas é uma forma de cyberbullying que pode ter consequências legais e emocionais sérias. Adolescentes muitas vezes não compreendem completamente os riscos envolvidos.",
  },
]


```

# data/scenarios.tsx

```tsx
import { Smartphone, MessageCircle, School, Users, Globe, AlertTriangle } from "lucide-react"
import type { Scenario } from "@/types/game"

export const scenarios: Scenario[] = [
  {
    id: "upset-child",
    text: "Seu filho de 10 anos parece muito chateado depois de usar o celular. Ao perguntar o que aconteceu, ele se esquiva e não quer falar.",
    icon: <Smartphone className="h-10 w-10 text-slate-700" />,
    difficulty: "beginner",
    interactionType: "multiple-choice",
    options: [
      "Ignorar, pois crianças resolvem essas coisas sozinhas.",
      "Tirar o celular dele como precaução.",
      "Conversar abertamente, demonstrar apoio e tentar entender a situação.",
      "Verificar o celular dele sem permissão para descobrir o que aconteceu.",
    ],
    correctAnswer: 2,
    correctFeedback:
      "Construir confiança é fundamental para que os filhos se sintam seguros para compartilhar suas experiências online. Observar mudanças de humor e estar atento são os primeiros passos para identificar possíveis problemas.",
    incorrectFeedback:
      "Esta abordagem pode não ser a mais eficaz. Construir um diálogo aberto e demonstrar apoio é essencial para que seu filho se sinta seguro para compartilhar o que está acontecendo.",
    additionalInfo:
      "Mudanças de comportamento, como tristeza, ansiedade ou evitar a escola, podem ser sinais de cyberbullying. Estabeleça uma comunicação aberta e sem julgamentos para que seu filho se sinta confortável em compartilhar suas experiências online.",
    legalInfo:
      "A Lei 13.185/2015 institui o Programa de Combate à Intimidação Sistemática, que inclui o cyberbullying. Pais têm papel fundamental na identificação e no apoio às vítimas.",
    mascot: "dpo",
  },
  {
    id: "social-media-anxiety",
    text: "Você percebe que seu filho adolescente está passando muitas horas nas redes sociais e parece ansioso.",
    icon: <MessageCircle className="h-10 w-10 text-slate-700" />,
    difficulty: "beginner",
    interactionType: "slider",
    sliderConfig: {
      min: 0,
      max: 10,
      step: 1,
      label: "Em uma escala de 0 a 10, quão importante é estabelecer limites de tempo para o uso de redes sociais?",
      unit: "/10",
    },
    correctAnswer: 8, // Valor ideal (com tolerância definida no componente)
    correctFeedback:
      "Estabelecer limites saudáveis é muito importante! Isso ajuda a desenvolver hábitos digitais equilibrados, reduzir a ansiedade e promover outras atividades essenciais para o desenvolvimento.",
    incorrectFeedback:
      "Reconsidere a importância dos limites de tempo. O uso excessivo de redes sociais está associado a problemas de saúde mental em adolescentes, incluindo ansiedade e depressão.",
    additionalInfo:
      "O uso excessivo de redes sociais pode estar relacionado a problemas de saúde mental em adolescentes. Estabeleça momentos livres de telas, incentive atividades offline e converse regularmente sobre as interações online.",
    mascot: "clipboard",
  },
  {
    id: "offensive-messages",
    text: "Um amigo comenta que viu mensagens ofensivas sobre seu filho em um grupo online.",
    icon: <Users className="h-10 w-10 text-slate-700" />,
    difficulty: "intermediate",
    interactionType: "timeline",
    timelineEvents: [
      { id: "talk", content: "Conversar com seu filho sobre a situação" },
      { id: "evidence", content: "Capturar e salvar evidências (prints, mensagens)" },
      { id: "report", content: "Reportar à plataforma onde ocorreu" },
      { id: "school", content: "Comunicar à escola" },
      { id: "authorities", content: "Se necessário, reportar às autoridades" },
    ],
    correctAnswer: ["talk", "evidence", "report", "school", "authorities"],
    correctFeedback:
      "Excelente! Esta é a sequência recomendada de ações. Primeiro entender a situação com seu filho, depois documentar as evidências e então reportar aos canais apropriados.",
    incorrectFeedback:
      "A ordem das ações é importante. Primeiro é essencial conversar com seu filho e entender a situação, depois documentar as evidências antes de tomar outras medidas.",
    additionalInfo:
      "No Brasil, o cyberbullying é considerado crime pela Lei 13.185/2015. Documentar as evidências é crucial caso seja necessário tomar medidas legais. Muitas plataformas têm ferramentas para denunciar conteúdo abusivo.",
    legalInfo:
      "O Marco Civil da Internet (Lei 12.965/2014) estabelece princípios e garantias para o uso da internet no Brasil, incluindo a proteção da privacidade e dos dados pessoais.",
  },
  {
    id: "new-social-network",
    text: "Seu filho mais novo pede para criar um perfil em uma nova rede social que você nunca ouviu falar.",
    icon: <Globe className="h-10 w-10 text-slate-700" />,
    difficulty: "intermediate",
    interactionType: "drag-drop",
    items: [
      { id: "research", content: "Pesquisar sobre a rede social" },
      { id: "age", content: "Verificar a idade mínima recomendada" },
      { id: "privacy", content: "Analisar as configurações de privacidade" },
      { id: "friends", content: "Perguntar quais amigos usam a rede" },
      { id: "content", content: "Verificar o tipo de conteúdo compartilhado" },
      { id: "allow", content: "Permitir o uso sem restrições" },
    ],
    categories: [
      { id: "recommended", name: "Ações Recomendadas" },
      { id: "not-recommended", name: "Ações Não Recomendadas" },
    ],
    correctAnswer: {
      recommended: ["research", "age", "privacy", "friends", "content"],
      "not-recommended": ["allow"],
    },
    correctFeedback:
      "Correto! Antes de permitir o uso de uma nova rede social, é importante fazer uma avaliação completa da plataforma, incluindo idade mínima, configurações de privacidade e tipo de conteúdo.",
    incorrectFeedback:
      "Revise sua classificação. Permitir o uso sem restrições não é recomendado sem antes fazer uma avaliação completa da plataforma.",
    additionalInfo:
      "Muitas redes sociais têm idade mínima de 13 anos devido à lei americana COPPA. Verifique as configurações de privacidade juntos e explique a importância de não compartilhar informações pessoais online.",
    mascot: "clipboard",
  },
  {
    id: "school-cyberbullying",
    text: "A escola do seu filho enviou um comunicado sobre um caso de cyberbullying envolvendo alunos.",
    icon: <School className="h-10 w-10 text-slate-700" />,
    difficulty: "advanced",
    interactionType: "chat",
    chatPrompt:
      "Como pai/mãe responsável, o que você faria ao receber este comunicado da escola sobre cyberbullying? Descreva suas ações.",
    correctAnswer: ["conversar", "filho", "escola", "política", "prevenção", "apoio"],
    correctFeedback:
      "Excelente resposta! Você mencionou elementos importantes como conversar com seu filho, entrar em contato com a escola e buscar entender as políticas de prevenção.",
    incorrectFeedback:
      "Sua resposta poderia incluir mais elementos importantes como conversar com seu filho para verificar seu envolvimento ou conhecimento, contatar a escola para entender as medidas sendo tomadas, e discutir estratégias de prevenção.",
    additionalInfo:
      "As escolas têm responsabilidade legal de implementar ações de prevenção e combate ao bullying, incluindo o cyberbullying. A Lei 13.185/2015 estabelece que instituições de ensino devem adotar medidas de conscientização, prevenção e combate ao bullying.",
    legalInfo:
      "A Lei Geral de Proteção de Dados (LGPD) também se aplica a dados de crianças e adolescentes, exigindo consentimento específico dos pais para coleta e tratamento desses dados.",
    mascot: "dpo",
  },
  {
    id: "intimate-photos",
    text: "Você descobre que seu filho está sendo pressionado a enviar fotos íntimas em um aplicativo de mensagens.",
    icon: <AlertTriangle className="h-10 w-10 text-slate-700" />,
    difficulty: "advanced",
    interactionType: "multiple-choice",
    options: [
      "Punir seu filho por estar envolvido nesse tipo de conversa.",
      "Ignorar, pois provavelmente é apenas uma fase da adolescência.",
      "Conversar seriamente sobre os riscos, oferecer apoio e, se necessário, buscar ajuda profissional e reportar às autoridades.",
      "Apenas deletar o aplicativo do celular dele.",
    ],
    correctAnswer: 2,
    correctFeedback:
      "É fundamental abordar a situação com seriedade, explicando os riscos legais e emocionais do compartilhamento de imagens íntimas. Ofereça apoio emocional, busque ajuda profissional se necessário e, dependendo da gravidade, reporte às autoridades.",
    incorrectFeedback:
      "Esta abordagem pode não ser a mais adequada para lidar com uma situação tão séria. É importante oferecer apoio, educação e, se necessário, buscar ajuda profissional.",
    additionalInfo:
      "No Brasil, a produção, posse ou compartilhamento de imagens íntimas de menores de 18 anos é crime, mesmo entre adolescentes. O Marco Civil da Internet (Lei 12.965/2014) também prevê a remoção de conteúdo íntimo compartilhado sem consentimento.",
    legalInfo:
      "O Estatuto da Criança e do Adolescente (ECA) tipifica como crime a produção, reprodução, venda ou divulgação de imagens pornográficas envolvendo crianças ou adolescentes.",
    context:
      "Esta é uma situação grave que requer atenção imediata. A pressão para enviar imagens íntimas (sexting) é uma forma de abuso que pode ter consequências legais e emocionais sérias.",
    mascot: "dpo",
  },
]


```

# hooks/use-mobile.tsx

```tsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

```

# hooks/use-toast.ts

```ts
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

```

# lib/themes.ts

```ts
export const themes = {
  default: {
    primary: '#0078c8',
    secondary: '#3ab0f8',
    accent: '#7dcbfc',
    background: '#ffffff',
    text: '#1a1a1a',
    border: '#e5e7eb'
  },
  highContrast: {
    primary: '#005a9e',
    secondary: '#007bd9',
    accent: '#009aff',
    background: '#ffffff',
    text: '#000000',
    border: '#000000'
  },
  kids: {
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    accent: '#ffe66d',
    background: '#ffffff',
    text: '#2d3436',
    border: '#dfe6e9',
    success: '#06d6a0',
    error: '#ff7675',
    warning: '#ffd93d'
  }
} as const;

export type ThemeType = keyof typeof themes;
export type ThemeColors = typeof themes[ThemeType];
```

# lib/utils.ts

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

# next.config.mjs

```mjs
let userConfig = undefined
try {
  // try to import ESM first
  userConfig = await import('./v0-user-next.config.mjs')
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig

```

# package.json

```json
{
  "name": "my-v0-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@emotion/is-prop-valid": "latest",
    "@hookform/resolvers": "^3.9.1",
    "@radix-ui/react-accordion": "^1.2.2",
    "@radix-ui/react-alert-dialog": "^1.1.4",
    "@radix-ui/react-aspect-ratio": "^1.1.1",
    "@radix-ui/react-avatar": "^1.1.2",
    "@radix-ui/react-checkbox": "^1.1.3",
    "@radix-ui/react-collapsible": "^1.1.2",
    "@radix-ui/react-context-menu": "^2.2.4",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-hover-card": "^1.1.4",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-menubar": "^1.1.4",
    "@radix-ui/react-navigation-menu": "^1.2.3",
    "@radix-ui/react-popover": "^1.1.4",
    "@radix-ui/react-progress": "^1.1.1",
    "@radix-ui/react-radio-group": "^1.2.2",
    "@radix-ui/react-scroll-area": "^1.2.2",
    "@radix-ui/react-select": "^2.1.4",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.1.2",
    "@radix-ui/react-switch": "^1.1.2",
    "@radix-ui/react-tabs": "^1.1.2",
    "@radix-ui/react-toast": "^1.2.4",
    "@radix-ui/react-toggle": "^1.1.1",
    "@radix-ui/react-toggle-group": "^1.1.1",
    "@radix-ui/react-tooltip": "^1.1.6",
    "autoprefixer": "^10.4.20",
    "canvas-confetti": "^1.9.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "1.0.4",
    "date-fns": "4.1.0",
    "embla-carousel-react": "8.5.1",
    "framer-motion": "^12.6.3",
    "input-otp": "1.4.1",
    "lucide-react": "^0.454.0",
    "next": "15.2.4",
    "next-themes": "^0.4.4",
    "react": "^19",
    "react-beautiful-dnd": "^13.1.1",
    "react-day-picker": "8.10.1",
    "react-dom": "^19",
    "react-hook-form": "^7.54.1",
    "react-resizable-panels": "^2.1.7",
    "recharts": "2.15.0",
    "sonner": "^1.7.1",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.6",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@types/canvas-confetti": "^1.9.0",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "postcss": "^8",
    "tailwindcss": "^3.4.17",
    "typescript": "^5"
  }
}
```

# postcss.config.mjs

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

# public/images/logo.png

This is a binary file of the type: Image

# public/images/mascot-clipboard.png

This is a binary file of the type: Image

# public/images/mascot-dpo.png

This is a binary file of the type: Image

# public/placeholder-logo.png

This is a binary file of the type: Image

# public/placeholder-logo.svg

This is a file of the type: SVG Image

# public/placeholder-user.jpg

This is a binary file of the type: Image

# public/placeholder.jpg

This is a binary file of the type: Image

# public/placeholder.svg

This is a file of the type: SVG Image

# styles/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: Arial, Helvetica, sans-serif;
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

# tailwind.config.ts

```ts
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        blue: {
          50: "#f0f7ff",
          100: "#e0eefe",
          200: "#bae0fd",
          300: "#7dcbfc",
          400: "#3ab0f8",
          500: "#0e96ea",
          600: "#0078c8",
          700: "#0060a3",
          800: "#065186",
          900: "#0a4570",
          950: "#072c4b",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config


```

# tsconfig.json

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "target": "ES6",
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

# types/game.ts

```ts
import type { ReactNode } from "react"

export type GameState = "intro" | "playing" | "feedback" | "results"
export type Difficulty = "beginner" | "intermediate" | "advanced"
export type InteractionType = "multiple-choice" | "drag-drop" | "slider" | "chat" | "timeline" | "hotspot"

export interface Scenario {
  id: string
  text: string
  icon: ReactNode
  difficulty: Difficulty | "all"
  interactionType: InteractionType

  // For multiple-choice
  options?: string[]

  // Common
  correctAnswer: number | string[] | Record<string, string[]>

  // For drag-drop
  items?: { id: string; content: string }[]
  categories?: { id: string; name: string }[]

  // For slider
  sliderConfig?: {
    min: number
    max: number
    step: number
    label: string
    unit?: string
  }

  // For chat
  chatPrompt?: string

  // For timeline
  timelineEvents?: { id: string; content: string }[]

  // For hotspot
  hotspotImage?: string
  hotspots?: { id: number; x: number; y: number; size: number; label: string }[]
  hotspotQuestion?: string

  // Feedback
  correctFeedback: string
  incorrectFeedback: string
  additionalInfo: string
  legalInfo?: string

  // UI
  context?: string
  mascot?: "clipboard" | "dpo"
}

export interface Answer {
  scenarioId: string
  userAnswer: any
  isCorrect: boolean
  interactionType: InteractionType
}


```

