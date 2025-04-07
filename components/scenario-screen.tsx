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
        // Normalize answer and correctAnswer to ensure consistent type comparison
        const userChoice = Number(answer);
        const correctChoice = Number(scenario.correctAnswer);
        
        if (process.env.NODE_ENV !== 'production') {
          console.log('User answer (multiple-choice):', answer, 'type:', typeof answer);
          console.log('Correct answer (multiple-choice):', scenario.correctAnswer, 'type:', typeof scenario.correctAnswer);
          console.log('Normalized user choice:', userChoice);
          console.log('Normalized correct choice:', correctChoice);
        }
        
        // Check if values are numbers and equal
        correct = !isNaN(userChoice) && !isNaN(correctChoice) && userChoice === correctChoice;
        break
      case "drag-drop": // Now using category-selection
        // Get the correct answer object
        const correctCategorization = scenario.correctAnswer as Record<string, string[]>;
        
        if (process.env.NODE_ENV !== 'production') {
          console.log('User answer:', answer);
          console.log('Correct answer:', correctCategorization);
          console.log('Difficulty:', difficulty);
        }
        
        // Apply different validation logic based on difficulty level
        if (difficulty === "beginner") {
          // For beginner, consider correct if most items (70%+) are in the right categories
          let totalCorrectItems = 0;
          let totalExpectedItems = 0;
          
          // For each category, count correctly placed items
          const categoryResults = Object.keys(correctCategorization).map(categoryId => {
            // Make sure the category exists in user's answer
            if (!answer[categoryId]) {
              if (process.env.NODE_ENV !== 'production') {
                console.log(`Category ${categoryId} missing in user answer`);
              }
              return { correctItems: 0, totalItems: correctCategorization[categoryId].length };
            }
            
            const correctItems = new Set(correctCategorization[categoryId]);
            const userItems = new Set(answer[categoryId]);
            
            // Count items correctly placed in this category
            const correctlyPlacedItems = [...correctItems].filter(item => userItems.has(item)).length;
            
            if (process.env.NODE_ENV !== 'production') {
              console.log(`Category ${categoryId}:`);
              console.log('  Correct items:', [...correctItems]);
              console.log('  User items:', [...userItems]);
              console.log('  Correctly placed items:', correctlyPlacedItems, 'out of', correctItems.size);
            }
            
            return { correctItems: correctlyPlacedItems, totalItems: correctItems.size };
          });
          
          // Calculate overall score
          categoryResults.forEach(result => {
            totalCorrectItems += result.correctItems;
            totalExpectedItems += result.totalItems;
          });
          
          const correctPercentage = totalExpectedItems > 0 ? 
                                  (totalCorrectItems / totalExpectedItems) * 100 : 0;
                                  
          if (process.env.NODE_ENV !== 'production') {
            console.log('Total correct items:', totalCorrectItems);
            console.log('Total expected items:', totalExpectedItems);
            console.log('Correct percentage:', correctPercentage + '%');
          }
          
          // Consider correct if at least 70% of all items are placed correctly
          correct = correctPercentage >= 70;
          
        } else if (difficulty === "intermediate") {
          // For intermediate, be slightly more lenient - each category must be mostly correct (80%+)
          correct = Object.keys(correctCategorization).every(categoryId => {
            // Make sure the category exists in user's answer
            if (!answer[categoryId]) {
              if (process.env.NODE_ENV !== 'production') {
                console.log(`Category ${categoryId} missing in user answer`);
              }
              return false;
            }
            
            const correctItems = new Set(correctCategorization[categoryId]);
            const userItems = new Set(answer[categoryId]);
            
            // Count correctly placed items in this category
            const correctlyPlacedItems = [...correctItems].filter(item => userItems.has(item)).length;
            const correctPercentage = (correctlyPlacedItems / correctItems.size) * 100;
            
            if (process.env.NODE_ENV !== 'production') {
              console.log(`Category ${categoryId}:`);
              console.log('  Correct items:', [...correctItems]);
              console.log('  User items:', [...userItems]);
              console.log('  Correctly placed items:', correctlyPlacedItems, 'out of', correctItems.size);
              console.log('  Correct percentage:', correctPercentage + '%');
            }
            
            // Consider category correct if at least 80% of items are correct
            return correctPercentage >= 80;
          });
        } else {
          // For advanced, maintain strict matching
          correct = Object.keys(correctCategorization).every(categoryId => {
            // Make sure the category exists in user's answer
            if (!answer[categoryId]) {
              if (process.env.NODE_ENV !== 'production') {
                console.log(`Category ${categoryId} missing in user answer`);
              }
              return false;
            }
            
            const correctItems = new Set(correctCategorization[categoryId]);
            const userItems = new Set(answer[categoryId]);
            
            // These checks help us see what's going wrong
            if (process.env.NODE_ENV !== 'production') {
              console.log(`Category ${categoryId}:`);
              console.log('  Correct items:', [...correctItems]);
              console.log('  User items:', [...userItems]);
              console.log('  Same size?', correctItems.size === userItems.size);
              console.log('  All correct items in user items?', [...correctItems].every(item => userItems.has(item)));
            }
            
            // Check if both sets have the same size and every item in correctItems is in userItems
            return correctItems.size === userItems.size && 
                   [...correctItems].every(item => userItems.has(item));
          });
        }
        break
      case "slider":
        // For slider, we consider correct if within a range
        const targetValue = scenario.correctAnswer as number
        const tolerance = difficulty === "beginner" ? 20 : difficulty === "intermediate" ? 15 : 10
        correct = Math.abs(answer - targetValue) <= tolerance
        break
      case "chat":
        if (process.env.NODE_ENV !== 'production') {
          console.log('User answer (chat):', answer);
          console.log('Difficulty:', difficulty);
        }
        
        // Check if we're using the new structured format or the old keyword format
        if (scenario.chatQuestions && Array.isArray(scenario.chatQuestions)) {
          // NEW FORMAT: Structured questions
          const userResponses = answer as Record<string, string>;
          
          if (process.env.NODE_ENV !== 'production') {
            console.log('Using structured questions format');
            console.log('Questions:', scenario.chatQuestions);
            console.log('User responses:', userResponses);
          }
          
          // Count how many correct answers the user gave
          let correctAnswersCount = 0;
          let totalQuestions = scenario.chatQuestions.length;
          
          scenario.chatQuestions.forEach(question => {
            const userResponseText = userResponses[question.id];
            
            if (userResponseText) {
              // Find which option the user selected by matching the text
              const selectedOptionId = question.options.find(option => 
                option.text === userResponseText
              )?.id;
              
              if (selectedOptionId) {
                // Find if this option is marked as correct
                const selectedOption = question.options.find(option => option.id === selectedOptionId);
                
                if (selectedOption?.isCorrect) {
                  correctAnswersCount++;
                  
                  if (process.env.NODE_ENV !== 'production') {
                    console.log(`Question ${question.id}: User selected correct option`);
                  }
                } else {
                  if (process.env.NODE_ENV !== 'production') {
                    console.log(`Question ${question.id}: User selected incorrect option`);
                  }
                }
              }
            }
          });
          
          const percentageCorrect = (correctAnswersCount / totalQuestions) * 100;
          
          if (process.env.NODE_ENV !== 'production') {
            console.log('Correct answers:', correctAnswersCount, 'out of', totalQuestions);
            console.log('Percentage correct:', percentageCorrect + '%');
          }
          
          // Different thresholds based on difficulty
          if (difficulty === "beginner") {
            // For beginner: At least 60% correct
            correct = percentageCorrect >= 60;
          } else if (difficulty === "intermediate") {
            // For intermediate: At least 75% correct
            correct = percentageCorrect >= 75;
          } else {
            // For advanced: At least 90% correct
            correct = percentageCorrect >= 90;
          }
          
        } else {
          // OLD FORMAT: Keywords in text
          // For backward compatibility
          const requiredKeywords = scenario.correctAnswer as string[];
          // For old format, answer is a string
          const answerText = typeof answer === 'string' ? answer : JSON.stringify(answer);
          // Normalize answer - remove accents, convert to lowercase
          const normalizedAnswer = answerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          
          if (process.env.NODE_ENV !== 'production') {
            console.log('Using keywords format');
            console.log('Normalized answer:', normalizedAnswer);
            console.log('Required keywords:', requiredKeywords);
          }
          
          // Check how many keywords are present
          const matchedKeywords = requiredKeywords.filter(keyword => {
            // Normalize keyword too
            const normalizedKeyword = keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return normalizedAnswer.includes(normalizedKeyword);
          });
          
          if (process.env.NODE_ENV !== 'production') {
            console.log('Matched keywords:', matchedKeywords);
            console.log('Match count:', matchedKeywords.length, 'out of', requiredKeywords.length);
          }
          
          // Different thresholds based on difficulty
          if (difficulty === "beginner") {
            // For beginner: At least 60% of keywords must be present
            const percentageMatched = (matchedKeywords.length / requiredKeywords.length) * 100;
            correct = percentageMatched >= 60;
            
            if (process.env.NODE_ENV !== 'production') {
              console.log('Percentage matched:', percentageMatched + '%');
              console.log('Required percentage:', '60%');
            }
          } else if (difficulty === "intermediate") {
            // For intermediate: At least 75% of keywords must be present
            const percentageMatched = (matchedKeywords.length / requiredKeywords.length) * 100;
            correct = percentageMatched >= 75;
            
            if (process.env.NODE_ENV !== 'production') {
              console.log('Percentage matched:', percentageMatched + '%');
              console.log('Required percentage:', '75%');
            }
          } else {
            // For advanced: All keywords must be present (original behavior)
            correct = matchedKeywords.length === requiredKeywords.length;
          }
        }
        break
      case "timeline": // Now using sequence-ordering
        const userSequence = Array.isArray(answer) ? answer : [];
        const correctSequence = Array.isArray(scenario.correctAnswer) ? scenario.correctAnswer : [];
        
        if (process.env.NODE_ENV !== 'production') {
          console.log('User sequence:', userSequence);
          console.log('Correct sequence:', correctSequence);
          console.log('Difficulty:', difficulty);
        }
        
        if (difficulty === "beginner") {
          // For beginner: Consider correct if most items (70%+) are in the correct position
          let correctPositions = 0;
          
          if (userSequence.length === correctSequence.length) {
            for (let i = 0; i < userSequence.length; i++) {
              if (userSequence[i] === correctSequence[i]) {
                correctPositions++;
              }
            }
            
            const percentageCorrect = (correctPositions / correctSequence.length) * 100;
            
            if (process.env.NODE_ENV !== 'production') {
              console.log('Correct positions:', correctPositions, 'out of', correctSequence.length);
              console.log('Percentage correct:', percentageCorrect + '%');
            }
            
            correct = percentageCorrect >= 70;
          } else {
            correct = false;
          }
        } else if (difficulty === "intermediate") {
          // For intermediate: Allow 1 item to be out of sequence
          if (userSequence.length === correctSequence.length) {
            let correctPositions = 0;
            
            for (let i = 0; i < userSequence.length; i++) {
              if (userSequence[i] === correctSequence[i]) {
                correctPositions++;
              }
            }
            
            const allowedErrors = 1;
            const errors = userSequence.length - correctPositions;
            
            if (process.env.NODE_ENV !== 'production') {
              console.log('Correct positions:', correctPositions, 'out of', correctSequence.length);
              console.log('Errors:', errors);
            }
            
            correct = errors <= allowedErrors;
          } else {
            correct = false;
          }
        } else {
          // For advanced: Sequence must be exactly correct
          correct = userSequence.length === correctSequence.length && 
                   userSequence.every((item, index) => item === correctSequence[index]);
        }
        break
      case "hotspot":
        // Normalize both answers to numbers for comparison
        const hotspotUserChoice = Number(answer);
        const hotspotCorrectChoice = Number(scenario.correctAnswer);
        
        if (process.env.NODE_ENV !== 'production') {
          console.log('User answer (hotspot):', answer, 'type:', typeof answer);
          console.log('Correct answer (hotspot):', scenario.correctAnswer, 'type:', typeof scenario.correctAnswer);
          console.log('Normalized user choice:', hotspotUserChoice);
          console.log('Normalized correct choice:', hotspotCorrectChoice);
          console.log('Difficulty:', difficulty);
        }
        
        // For hotspot, we allow some flexibility in beginner mode
        if (difficulty === "beginner" && Array.isArray(scenario.hotspots) && scenario.hotspots.length > 0) {
          // For beginner, we can accept alternative correct answers if defined
          // Check if there's an "almost correct" option for beginners
          const almostCorrectOptions = scenario.hotspots
            .filter(h => h.isAlmostCorrect === true)
            .map(h => h.id);
            
          if (process.env.NODE_ENV !== 'production') {
            console.log('Almost correct options:', almostCorrectOptions);
          }
          
          // Direct match or match with an almost correct option
          correct = hotspotUserChoice === hotspotCorrectChoice || 
                  (almostCorrectOptions && almostCorrectOptions.includes(hotspotUserChoice));
        } else {
          // Standard exact match
          correct = !isNaN(hotspotUserChoice) && 
                   !isNaN(hotspotCorrectChoice) && 
                   hotspotUserChoice === hotspotCorrectChoice;
        }
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
        return <MultipleChoiceInteraction options={scenario.options || []} onSelect={handleSubmitAnswer} />
      case "drag-drop":
        // Replace drag-drop with category selection
        return (
          <CategorySelectionInteraction
            items={scenario.items || []}
            categories={scenario.categories || []}
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
        return (
          <ChatInteraction 
            prompt={scenario.chatPrompt || ""} 
            questions={scenario.chatQuestions || []} 
            onSubmit={handleSubmitAnswer} 
          />
        )
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
              exit={{ opacity: 0, y: -20 }}
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

