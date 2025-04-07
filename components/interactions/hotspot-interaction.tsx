"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Option {
  id: number
  label: string
  description?: string
}

interface CarouselInteractionProps {
  image: string
  options: Option[]
  question: string
  onSelect: (optionId: number) => void
}

export default function CarouselInteraction({ image, options, question, onSelect }: CarouselInteractionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const currentOption = options[currentIndex]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? options.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === options.length - 1 ? 0 : prev + 1))
  }

  const handleSelect = (id: number) => {
    setSelectedOption(id)
  }

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onSelect(selectedOption)
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-purple-500 italic text-center">{question}</p>

      <div className="w-full max-w-xl mx-auto bg-purple-50 rounded-lg overflow-hidden p-4">
        {/* Imagem de cenário */}
        <div className="mb-6 rounded-lg overflow-hidden shadow-md">
          <img src={image || "/placeholder.svg"} alt="Scenario" className="w-full h-auto object-contain" />
        </div>

        {/* Navegação do carrossel */}
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={handlePrevious}
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-purple-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex space-x-1">
            {options.map((option, idx) => (
              <div
                key={option.id}
                className={`w-2 h-2 rounded-full ${
                  idx === currentIndex ? "bg-purple-600" : "bg-purple-200"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-purple-300"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Opção atual */}
        <div className="relative h-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentOption.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className={`absolute w-full p-4 rounded-lg border-2 ${
                selectedOption === currentOption.id
                  ? "border-purple-600 bg-purple-50"
                  : "border-purple-200 bg-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedOption === currentOption.id
                      ? "bg-purple-600 text-white"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  <span className="font-bold">{currentOption.id}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-purple-800">{currentOption.label}</h3>
                  {currentOption.description && (
                    <p className="text-sm text-gray-600">{currentOption.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Botões de ação */}
        <div className="mt-6 flex space-x-2 justify-center">
          <Button
            onClick={() => handleSelect(currentOption.id)}
            variant={selectedOption === currentOption.id ? "secondary" : "outline"}
            className={
              selectedOption === currentOption.id
                ? "bg-purple-200 text-purple-800 border-purple-400"
                : ""
            }
          >
            {selectedOption === currentOption.id ? "Selecionado" : "Selecionar esta opção"}
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  )
}

