"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, RotateCcw, Download, Award, ExternalLink } from "lucide-react"
import type { Scenario, Answer, Difficulty } from "@/types/game"
import Image from "next/image"

interface ResultsScreenProps {
  score: number
  answers: Answer[]
  scenarios: Scenario[]
  difficulty: Difficulty
  onRestart: () => void
}

export default function ResultsScreen({ score, answers, scenarios, difficulty, onRestart }: ResultsScreenProps) {
  const [showCertificate, setShowCertificate] = useState(false)
  const [showResources, setShowResources] = useState(false)

  const totalPossibleScore =
    scenarios.length * (difficulty === "beginner" ? 10 : difficulty === "intermediate" ? 15 : 20)
  const percentage = totalPossibleScore > 0 ? Math.round((score / totalPossibleScore) * 100) : 0

  useEffect(() => {
    // Trigger confetti for good scores
    if (percentage >= 70) {
      import("canvas-confetti").then((confetti) => {
        const duration = 3 * 1000
        const end = Date.now() + duration

        const colors = ["#7c3aed", "#8b5cf6", "#a78bfa"]
        ;(function frame() {
          confetti.default({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
          })

          confetti.default({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
          })

          if (Date.now() < end) {
            requestAnimationFrame(frame)
          }
        })()
      })
    }
  }, [percentage])

  let message = ""
  if (percentage >= 90) {
    message = "Excelente! Você está muito bem preparado para ajudar seus filhos a lidar com o cyberbullying!"
  } else if (percentage >= 70) {
    message = "Muito bom! Você tem bons conhecimentos sobre prevenção e resposta ao cyberbullying."
  } else if (percentage >= 50) {
    message = "Bom trabalho! Você está no caminho certo, mas ainda há espaço para aprender mais."
  } else {
    message = "Continue aprendendo! A proteção das crianças contra o cyberbullying é um tema importante."
  }

  const getScenarioById = (id: string): Scenario | undefined => {
    return scenarios.find((s) => s.id === id)
  }

  const resources = [
    {
      title: "SaferNet Brasil",
      description: "Portal com informações e canais de denúncia para violações online",
      url: "https://new.safernet.org.br/",
    },
    {
      title: "Cartilha de Segurança para Internet",
      description: "Material educativo sobre segurança online do CERT.br",
      url: "https://cartilha.cert.br/",
    },
    {
      title: "Canal de Ajuda",
      description: "Serviço de atendimento a vítimas de violência online",
      url: "https://new.safernet.org.br/helpline",
    },
  ]

  return (
    <Card className="w-full overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white text-center relative">
        <motion.div
          className="absolute right-4 bottom-0 transform translate-y-1/3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Image src="/images/mascot-dpo.png" alt="DPO Mascot" width={80} height={80} />
        </motion.div>

        <motion.h2
          className="text-3xl font-bold mb-2 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Resultados
        </motion.h2>
      </div>

      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-blue-100 mb-4 relative">
            <span className="text-3xl font-bold text-blue-700">{percentage}%</span>
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#0078c8"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${percentage * 2.83} 283`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
                initial={{ strokeDasharray: "0 283" }}
                animate={{ strokeDasharray: `${percentage * 2.83} 283` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </svg>
          </div>

          <h3 className="text-xl font-semibold mb-2">
            Você marcou {score} de {totalPossibleScore} pontos possíveis
          </h3>

          <p className="text-gray-600 mb-6">{message}</p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-6"
          >
            {percentage >= 70 && (
              <Button
                variant="outline"
                className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                onClick={() => setShowCertificate(!showCertificate)}
              >
                <Award className="h-4 w-4" />
                {showCertificate ? "Ocultar Certificado" : "Ver Certificado"}
              </Button>
            )}

            <Button
              variant="outline"
              className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={() => setShowResources(!showResources)}
            >
              <ExternalLink className="h-4 w-4" />
              {showResources ? "Ocultar Recursos" : "Recursos Adicionais"}
            </Button>
          </motion.div>

          {showCertificate && (
            <motion.div
              className="mb-6 p-6 border-2 border-blue-200 rounded-lg bg-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center relative p-8 border-4 border-blue-700">
                <div className="absolute top-4 left-4">
                  <Image src="/images/logo.png" alt="Rafael Maciel Sociedade de Advogados" width={100} height={40} />
                </div>

                <h3 className="text-2xl font-bold text-blue-800 mb-2 mt-10">Certificado de Conclusão</h3>
                <p className="text-lg mb-4">Cyberbullying: Game educativo para prevenção e combate</p>
                <p className="mb-6">
                  Este certificado reconhece que você completou com sucesso o treinamento sobre prevenção e resposta ao
                  cyberbullying.
                </p>
                <p className="text-sm text-blue-500 mb-4">{new Date().toLocaleDateString()}</p>

                <div className="flex justify-center">
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="mr-2 h-4 w-4" /> Baixar Certificado
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {showResources && (
            <motion.div
              className="mb-6 p-6 border-2 border-purple-200 rounded-lg bg-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-purple-800">Recursos para Combate ao Cyberbullying</h3>
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <motion.a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <div className="flex items-center">
                      <div className="mr-3">
                        <ExternalLink className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-700">{resource.title}</h4>
                        <p className="text-sm text-purple-600">{resource.description}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-purple-800">Resumo das Respostas</h3>

          <div className="space-y-4">
            {answers.map((answer, index) => {
              const scenario = getScenarioById(answer.scenarioId)
              return scenario ? (
                <motion.div
                  key={index}
                  className="p-4 border border-purple-200 rounded-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {answer.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium mb-1">{scenario.text}</p>
                      <p className="text-sm text-gray-600 mb-1">
                        {answer.isCorrect ? scenario.correctFeedback : scenario.incorrectFeedback}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : null
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={onRestart} className="bg-blue-600 hover:bg-blue-700 text-white">
            <RotateCcw className="mr-2 h-4 w-4" /> Jogar Novamente
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

