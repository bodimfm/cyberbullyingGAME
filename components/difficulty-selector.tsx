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

