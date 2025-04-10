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
        if (typeof answer === 'object' && answer !== null) {
          return (
            <div className="space-y-2">
              {Object.entries(answer).map(([questionId, responseText]) => {
                const question = scenario.chatQuestions?.find(q => q.id === questionId);
                return (
                  <div key={questionId} className="py-1">
                    {question && <p className="text-sm font-medium text-gray-600">{question.text}</p>}
                    <p className="ml-3">{responseText as string}</p>
                  </div>
                );
              })}
            </div>
          )
        }
        return answer as string || "Sem resposta"
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
        if (scenario.chatQuestions && scenario.chatQuestions.length > 0) {
          return (
            <div className="space-y-2">
              {scenario.chatQuestions.map(question => {
                const correctOption = question.options.find(opt => opt.isCorrect);
                if (!correctOption) return null;
                
                return (
                  <div key={question.id} className="py-1">
                    <p className="text-sm font-medium text-gray-600">{question.text}</p>
                    <p className="ml-3">{correctOption.text}</p>
                  </div>
                );
              })}
            </div>
          );
        }
        if (Array.isArray(answer)) {
          return `Palavras-chave esperadas: ${(answer as string[]).join(", ")}`;
        }
        return "Resposta modelo não disponível"
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
          <Info className="w-5 h-5 mr-2 text-oab-blue-DEFAULT" />
          <h3 className="text-lg font-semibold">Saiba mais:</h3>
        </div>
        <div className="p-4 rounded-md bg-blue-50 border border-oab-blue-light">
          <p className="text-oab-blue-DEFAULT">{scenario.additionalInfo}</p>

          {scenario.legalInfo && (
            <div className="mt-3 pt-3 border-t border-oab-blue-light">
              <p className="text-sm font-medium text-oab-blue-DEFAULT mb-1">Aspectos Legais:</p>
              <p className="text-sm text-oab-blue-DEFAULT opacity-90">{scenario.legalInfo}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        {onBack && (
          <Button onClick={onBack} variant="oabOutlineBlue" className="hover:bg-blue-50">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar à pergunta
          </Button>
        )}
        <div className={onBack ? "" : "ml-auto"}>
          <Button onClick={onContinue} variant="oabBlue">
            Continuar <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

