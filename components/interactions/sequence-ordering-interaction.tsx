"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertCircle, ChevronUp, ChevronDown } from "lucide-react"

interface TimelineEvent {
  id: string
  content: string
}

interface SequenceOrderingProps {
  events: TimelineEvent[]
  onComplete: (orderedEvents: string[]) => void
}

export default function SequenceOrderingInteraction({ events, onComplete }: SequenceOrderingProps) {
  const [orderedEvents, setOrderedEvents] = useState<TimelineEvent[]>([...events])
  const [hasReordered, setHasReordered] = useState(false)
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  // Reset hasReordered when events change
  useEffect(() => {
    setHasReordered(false)
    setAttemptedSubmit(false)
  }, [events])

  // Function to move an event up in the sequence
  const moveUp = (index: number) => {
    if (index === 0) return

    const newOrderedEvents = [...orderedEvents]
    const temp = newOrderedEvents[index]
    newOrderedEvents[index] = newOrderedEvents[index - 1]
    newOrderedEvents[index - 1] = temp

    setOrderedEvents(newOrderedEvents)
    setHasReordered(true)

    // Reset attempted submit when user reorders
    if (attemptedSubmit) {
      setAttemptedSubmit(false)
    }
  }

  // Function to move an event down in the sequence
  const moveDown = (index: number) => {
    if (index === orderedEvents.length - 1) return

    const newOrderedEvents = [...orderedEvents]
    const temp = newOrderedEvents[index]
    newOrderedEvents[index] = newOrderedEvents[index + 1]
    newOrderedEvents[index + 1] = temp

    setOrderedEvents(newOrderedEvents)
    setHasReordered(true)

    // Reset attempted submit when user reorders
    if (attemptedSubmit) {
      setAttemptedSubmit(false)
    }
  }

  // Function to handle submission
  const handleSubmit = () => {
    if (!hasReordered) {
      setAttemptedSubmit(true)
      return
    }
    onComplete(orderedEvents.map((event) => event.id))
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-blue-600 italic text-center mb-4">
        Organize os eventos na ordem correta usando os botões para mover para cima ou para baixo
      </p>

      <div className="border-2 border-blue-200 rounded-lg p-4 bg-white">
        <div className="space-y-2">
          {orderedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="p-3 rounded-md border-2 bg-white border-blue-200 hover:border-blue-300"
              initial={{ opacity: 1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-medium text-blue-700">{index + 1}</span>
                </div>

                <div className="flex-1">{event.content}</div>

                <div className="flex flex-col ml-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className={`h-8 w-8 p-0 ${index === 0 ? "opacity-50" : "hover:bg-blue-100"}`}
                    aria-label={`Mover ${event.content} para cima`}
                  >
                    <ChevronUp className="h-5 w-5 text-blue-700" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveDown(index)}
                    disabled={index === orderedEvents.length - 1}
                    className={`h-8 w-8 p-0 ${index === orderedEvents.length - 1 ? "opacity-50" : "hover:bg-blue-100"}`}
                    aria-label={`Mover ${event.content} para baixo`}
                  >
                    <ChevronDown className="h-5 w-5 text-blue-700" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center mt-6">
        {attemptedSubmit && !hasReordered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 flex items-center mb-3"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            <span className="text-sm">Por favor, reordene os eventos antes de continuar</span>
          </motion.div>
        )}

        <Button
          onClick={handleSubmit}
          className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 h-auto transition-all duration-300 ${
            !hasReordered ? "opacity-70" : "shadow-md hover:shadow-lg"
          }`}
          aria-label="Confirmar ordem dos eventos"
        >
          Confirmar Ordem
        </Button>
      </div>
    </div>
  )
}

