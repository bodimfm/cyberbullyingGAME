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
      <h2 className="text-xl font-bold text-center text-oab-blue-DEFAULT mb-6">Escolha o nível de dificuldade</h2>

      <div className="grid gap-4">
        {difficulties.map((difficulty, index) => (
          <motion.div
            key={difficulty.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white border border-oab-blue-light rounded-lg p-4 cursor-pointer hover:border-oab-blue-DEFAULT hover:shadow-md transition-all"
            onClick={() => onSelect(difficulty.value)}
          >
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-2xl font-bold text-oab-blue-DEFAULT">{index + 1}</span>
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-1">
                  <h3 className="font-bold text-oab-blue-DEFAULT">{difficulty.label}</h3>
                  {difficulty.badge && (
                    <Badge variant="outline" className="ml-2 bg-blue-50 text-oab-red-DEFAULT border-oab-red-DEFAULT">
                      {difficulty.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-oab-blue-DEFAULT mb-2">{difficulty.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {difficulty.features.map((feature, fIndex) => (
                    <span key={fIndex} className="text-xs px-2 py-1 bg-blue-50 rounded-full text-oab-blue-DEFAULT">
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

