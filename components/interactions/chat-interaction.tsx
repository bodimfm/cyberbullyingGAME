"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"

interface ChatInteractionProps {
  prompt: string
  questions?: {
    id: string;
    text: string;
    options: {
      id: string;
      text: string;
    }[];
  }[];
  onSubmit: (responses: Record<string, string>) => void
}

export default function ChatInteraction({ prompt, questions = [], onSubmit }: ChatInteractionProps) {
  // Default questions if none are provided
  const defaultQuestions = [
    {
      id: "question1",
      text: "Como você iniciaria a conversa sobre este tema?",
      options: [
        { id: "q1_opt1", text: "De forma calma e acolhedora, criando um ambiente seguro para diálogo" },
        { id: "q1_opt2", text: "Diretamente, abordando o problema sem rodeios" },
        { id: "q1_opt3", text: "Esperaria a criança trazer o assunto" },
      ]
    },
    {
      id: "question2",
      text: "Qual aspecto é mais importante abordar primeiro?",
      options: [
        { id: "q2_opt1", text: "O impacto emocional e psicológico do bullying" },
        { id: "q2_opt2", text: "As consequências disciplinares para quem pratica" },
        { id: "q2_opt3", text: "Como se defender e responder aos agressores" },
        { id: "q2_opt4", text: "A importância de denunciar e buscar ajuda" }
      ]
    },
    {
      id: "question3",
      text: "Quem deve ser envolvido na resolução do problema?",
      options: [
        { id: "q3_opt1", text: "Apenas a família" },
        { id: "q3_opt2", text: "A escola e a família" },
        { id: "q3_opt3", text: "A escola, a família e autoridades, se necessário" }
      ]
    }
  ];

  // Use provided questions or default ones
  const questionsToUse = questions.length > 0 ? questions : defaultQuestions;
  
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questionsToUse[currentQuestionIndex];

  const handleSelectOption = (questionId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questionsToUse.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
      
      // Transform selected option IDs to a record of question IDs and selected option texts
      const responses: Record<string, string> = {};
      
      Object.entries(selectedOptions).forEach(([questionId, optionId]) => {
        const question = questionsToUse.find(q => q.id === questionId);
        if (question) {
          const option = question.options.find(o => o.id === optionId);
          if (option) {
            responses[questionId] = option.text;
          }
        }
      });
      
      onSubmit(responses);
    }
  };

  const isPreviousAvailable = currentQuestionIndex > 0;
  const isNextAvailable = !!selectedOptions[currentQuestion?.id];
  const allQuestionsAnswered = questionsToUse.every(q => selectedOptions[q.id]);

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
      <div className="bg-blue-600 text-white p-4">
        <h3 className="font-medium">Perguntas sobre o cenário</h3>
        <p className="text-sm text-blue-100 mt-1">{prompt}</p>
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-6">
          {questionsToUse.map((q, idx) => (
            <div 
              key={q.id}
              className={`relative flex-1 h-1.5 rounded-full overflow-hidden ${
                idx < currentQuestionIndex 
                  ? 'bg-blue-500' 
                  : idx === currentQuestionIndex 
                    ? 'bg-blue-200' 
                    : 'bg-gray-200'
              }`}
            >
              {selectedOptions[q.id] && idx === currentQuestionIndex && (
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              {currentQuestionIndex + 1}. {currentQuestion?.text}
            </h4>

            <div className="space-y-3 mb-6">
              {currentQuestion?.options.map((option) => (
                <div 
                  key={option.id}
                  onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                  className={`p-3 border rounded-lg cursor-pointer transition flex items-center gap-3 ${
                    selectedOptions[currentQuestion.id] === option.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    selectedOptions[currentQuestion.id] === option.id
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-300'
                  }`}>
                    {selectedOptions[currentQuestion.id] === option.id && (
                      <CheckIcon className="w-3 h-3" />
                    )}
                  </div>
                  <span>{option.text}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={!isPreviousAvailable}
                className={`${!isPreviousAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Anterior
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isNextAvailable}
                className={`bg-blue-600 hover:bg-blue-700 text-white ${!isNextAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {currentQuestionIndex < questionsToUse.length - 1 ? 'Próxima' : 'Concluir'}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {isComplete && (
        <div className="p-4 bg-blue-50 border-t border-blue-100">
          <p className="text-blue-700 text-center">
            Respostas enviadas com sucesso!
          </p>
        </div>
      )}
    </div>
  );
}