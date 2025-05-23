"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, RotateCcw, Download, Award, ExternalLink } from "lucide-react"
import type { Scenario, Answer, Difficulty, InteractionType } from "@/types/game"
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

  // Calculate correct answer percentage 
  const correctAnswersCount = answers.filter(a => a.isCorrect).length;
  const totalAnswers = answers.length;
  const correctPercentage = totalAnswers > 0 ? Math.round((correctAnswersCount / totalAnswers) * 100) : 0;

  useEffect(() => {
    // Trigger confetti for good scores based on correct answer percentage
    if (correctPercentage >= 70) {
      import("canvas-confetti").then((confetti) => {
        const duration = 3 * 1000
        const end = Date.now() + duration

        // Cores da OAB-Goiás
        const colors = ["#005691", "#6496c1", "#C00000"]
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
  }, [correctPercentage])

  // Generate dynamic message based on actual score and correct answers
  
  let message = ""
  if (correctPercentage >= 90) {
    message = `Excelente! Você acertou ${correctAnswersCount} de ${totalAnswers} questões. Você está muito bem preparado para ajudar seus filhos a lidar com o cyberbullying!`
  } else if (correctPercentage >= 70) {
    message = `Muito bom! Você acertou ${correctAnswersCount} de ${totalAnswers} questões. Você tem bons conhecimentos sobre prevenção e resposta ao cyberbullying.`
  } else if (correctPercentage >= 50) {
    message = `Bom trabalho! Você acertou ${correctAnswersCount} de ${totalAnswers} questões. Você está no caminho certo, mas ainda há espaço para aprender mais.`
  } else {
    message = `Continue aprendendo! Você acertou ${correctAnswersCount} de ${totalAnswers} questões. A proteção das crianças contra o cyberbullying é um tema importante.`
  }

  const getScenarioById = (id: string): Scenario | undefined => {
    return scenarios.find((s) => s.id === id)
  }
  
  // Renderiza a resposta correta baseada no tipo de interação
  const renderCorrectAnswer = (scenario: Scenario, interactionType: InteractionType) => {
    switch (interactionType) {
      case "multiple-choice":
        const correctOptionIndex = Number(scenario.correctAnswer);
        return (
          <p className="text-sm text-gray-700">
            {scenario.options && scenario.options[correctOptionIndex]}
          </p>
        );
        
      case "drag-drop":
        const categorization = scenario.correctAnswer as Record<string, string[]>;
        return (
          <div className="text-sm text-gray-700">
            {Object.entries(categorization).map(([category, items], index) => {
              const categoryName = scenario.categories?.find(c => c.id === category)?.name || category;
              return (
                <div key={index} className="mb-1">
                  <span className="font-medium">{categoryName}:</span>{" "}
                  {items.map(itemId => {
                    const item = scenario.items?.find(i => i.id === itemId);
                    return item ? item.content : itemId;
                  }).join(", ")}
                </div>
              );
            })}
          </div>
        );
        
      case "slider":
        return (
          <p className="text-sm text-gray-700">
            {scenario.correctAnswer}
            {scenario.sliderConfig?.unit ? ` ${scenario.sliderConfig.unit}` : ""}
          </p>
        );
        
      case "chat":
        // Check if we have the new structured format or old keywords format
        if (scenario.chatQuestions && Array.isArray(scenario.chatQuestions)) {
          // New structured format
          return (
            <div className="text-sm text-gray-700">
              {scenario.chatQuestions.map((question, index) => {
                const correctOptions = question.options.filter(opt => opt.isCorrect);
                
                return (
                  <div key={index} className="mb-2">
                    <div className="font-medium">{index + 1}. {question.text}</div>
                    {correctOptions.length > 0 ? (
                      <ul className="list-disc pl-8">
                        {correctOptions.map((option, optIndex) => (
                          <li key={optIndex} className="text-green-600">
                            {option.text}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="pl-4 text-gray-500 italic">Nenhuma opção marcada como correta.</p>
                    )}
                  </div>
                );
              })}
            </div>
          );
        } else {
          // Old keywords format
          const keywords = scenario.correctAnswer as string[];
          return (
            <p className="text-sm text-gray-700">
              Palavras-chave esperadas: {keywords.join(", ")}
            </p>
          );
        }
        
      case "timeline":
        const sequence = scenario.correctAnswer as string[];
        return (
          <div className="text-sm text-gray-700">
            <ol className="list-decimal pl-5">
              {sequence.map((eventId, index) => {
                const event = scenario.timelineEvents?.find(e => e.id === eventId);
                return <li key={index}>{event ? event.content : eventId}</li>;
              })}
            </ol>
          </div>
        );
        
      case "hotspot":
        const correctHotspotId = Number(scenario.correctAnswer);
        const hotspot = scenario.hotspots?.find(h => h.id === correctHotspotId);
        return (
          <p className="text-sm text-gray-700">
            {hotspot ? hotspot.label : `Opção ${correctHotspotId}`}
          </p>
        );
        
      default:
        return null;
    }
  };
  
  // Renderiza a resposta do usuário baseada no tipo de interação
  const renderUserAnswer = (userAnswer: any, interactionType: InteractionType, scenario: Scenario) => {
    switch (interactionType) {
      case "multiple-choice":
        const optionIndex = Number(userAnswer);
        return (
          <p className="text-sm text-gray-700">
            {scenario.options && scenario.options[optionIndex]}
          </p>
        );
        
      case "drag-drop":
        return (
          <div className="text-sm text-gray-700">
            {Object.entries(userAnswer).map(([category, items]: [string, any], index) => {
              const categoryName = scenario.categories?.find(c => c.id === category)?.name || category;
              return (
                <div key={index} className="mb-1">
                  <span className="font-medium">{categoryName}:</span>{" "}
                  {Array.isArray(items) && items.map(itemId => {
                    const item = scenario.items?.find(i => i.id === itemId);
                    return item ? item.content : itemId;
                  }).join(", ")}
                </div>
              );
            })}
          </div>
        );
        
      case "slider":
        return (
          <p className="text-sm text-gray-700">
            {userAnswer}
            {scenario.sliderConfig?.unit ? ` ${scenario.sliderConfig.unit}` : ""}
          </p>
        );
        
      case "chat":
        // Check if we have the new structured format or old text format
        if (typeof userAnswer === 'object' && userAnswer !== null) {
          // New structured format
          return (
            <div className="text-sm text-gray-700">
              {scenario.chatQuestions && Object.entries(userAnswer as Record<string, string>).map(([questionId, answerText], index) => {
                const question = scenario.chatQuestions?.find(q => q.id === questionId);
                const selectedOption = question?.options.find(opt => opt.text === answerText);
                
                return question ? (
                  <div key={index} className="mb-2">
                    <div className="font-medium">{index + 1}. {question.text}</div>
                    <div className={`pl-4 ${selectedOption?.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {answerText}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          );
        } else {
          // Old text format - show the text directly
          return (
            <p className="text-sm text-gray-700 italic">
              "{userAnswer}"
            </p>
          );
        }
        
      case "timeline":
        return (
          <div className="text-sm text-gray-700">
            <ol className="list-decimal pl-5">
              {Array.isArray(userAnswer) && userAnswer.map((eventId, index) => {
                const event = scenario.timelineEvents?.find(e => e.id === eventId);
                return <li key={index}>{event ? event.content : eventId}</li>;
              })}
            </ol>
          </div>
        );
        
      case "hotspot":
        const hotspotId = Number(userAnswer);
        const hotspot = scenario.hotspots?.find(h => h.id === hotspotId);
        return (
          <p className="text-sm text-gray-700">
            {hotspot ? hotspot.label : `Opção ${hotspotId}`}
          </p>
        );
        
      default:
        return <p className="text-sm text-gray-700">{JSON.stringify(userAnswer)}</p>;
    }
  };

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
    {
      title: "OAB-GO - Comissão de Direito Digital",
      description: "Informações sobre direitos digitais e segurança online",
      url: "https://www.oabgo.org.br/",
    }
  ]

  return (
    <Card className="w-full overflow-hidden">
      <div className="bg-gradient-to-r from-oab-blue-DEFAULT to-oab-blue-dark p-6 text-white text-center relative">
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
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-blue-50 mb-4 relative">
            <span className="text-3xl font-bold text-oab-blue-DEFAULT">{percentage}%</span>
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#005691"
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
          
          <div className="text-lg text-oab-red-DEFAULT mb-4">
            {answers.filter(a => a.isCorrect).length} de {answers.length} respostas corretas
          </div>

          <p className="text-gray-600 mb-6">{message}</p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-6"
          >
            {correctPercentage >= 70 && (
              <Button
                variant="oabOutlineBlue"
                className="flex items-center gap-2"
                onClick={() => setShowCertificate(!showCertificate)}
              >
                <Award className="h-4 w-4" />
                {showCertificate ? "Ocultar Certificado" : "Ver Certificado"}
              </Button>
            )}

            <Button
              variant="oabOutlineRed"
              className="flex items-center gap-2"
              onClick={() => setShowResources(!showResources)}
            >
              <ExternalLink className="h-4 w-4" />
              {showResources ? "Ocultar Recursos" : "Recursos Adicionais"}
            </Button>
          </motion.div>

          {showCertificate && (
            <motion.div
              className="mb-6 p-6 border-2 border-oab-blue-light rounded-lg bg-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center relative p-8 border-4 border-oab-blue-DEFAULT">
                <div className="absolute top-4 left-4">
                  <Image src="/images/logo.png" alt="OAB GOIÁS" width={100} height={40} />
                </div>

                <h3 className="text-2xl font-bold text-oab-blue-DEFAULT mb-2 mt-10">Certificado de Conclusão</h3>
                <p className="text-lg mb-4">Cyberbullying: Game educativo para prevenção e combate</p>
                <p className="mb-6">
                  Este certificado reconhece que você completou com sucesso o treinamento sobre prevenção e resposta ao
                  cyberbullying.
                </p>
                <p className="text-sm text-oab-blue-DEFAULT mb-4">{new Date().toLocaleDateString()}</p>

                <div className="flex justify-center">
                  <Button variant="oabBlue" className="mt-4">
                    <Download className="mr-2 h-4 w-4" /> Baixar Certificado
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {showResources && (
            <motion.div
              className="mb-6 p-6 border-2 border-oab-blue-light rounded-lg bg-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-oab-blue-DEFAULT">Recursos para Combate ao Cyberbullying</h3>
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <motion.a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-oab-blue-light rounded-lg hover:bg-blue-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <div className="flex items-center">
                      <div className="mr-3">
                        <ExternalLink className="h-5 w-5 text-oab-blue-DEFAULT" />
                      </div>
                      <div>
                        <h4 className="font-medium text-oab-blue-DEFAULT">{resource.title}</h4>
                        <p className="text-sm text-oab-blue-DEFAULT opacity-80">{resource.description}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-oab-blue-DEFAULT">Resumo das Respostas</h3>

          <div className="space-y-4">
            {answers.map((answer, index) => {
              const scenario = getScenarioById(answer.scenarioId)
              return scenario ? (
                <motion.div
                  key={index}
                  className="p-4 border border-oab-blue-light rounded-md"
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
                    <div className="w-full">
                      <p className="font-medium mb-1">{scenario.text}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        {answer.isCorrect ? scenario.correctFeedback : scenario.incorrectFeedback}
                      </p>
                      
                      {/* Mostrar informações adicionais sobre a resposta */}
                      {!answer.isCorrect && (
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <p className="text-xs text-oab-blue-DEFAULT font-medium mb-1">Resposta correta:</p>
                          {renderCorrectAnswer(scenario, answer.interactionType)}
                        </div>
                      )}
                      
                      {/* Mostrar a resposta do usuário */}
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="text-xs text-oab-blue-DEFAULT font-medium mb-1">Sua resposta:</p>
                        {renderUserAnswer(answer.userAnswer, answer.interactionType, scenario)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={onRestart} variant="oabBlue">
            <RotateCcw className="mr-2 h-4 w-4" /> Jogar Novamente
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

