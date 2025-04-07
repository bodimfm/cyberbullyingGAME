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

