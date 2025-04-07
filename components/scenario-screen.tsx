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

