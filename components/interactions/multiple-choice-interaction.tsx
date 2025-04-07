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

