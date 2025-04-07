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

