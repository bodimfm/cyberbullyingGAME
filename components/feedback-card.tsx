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

