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

