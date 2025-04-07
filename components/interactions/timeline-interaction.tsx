"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { GripVertical, AlertCircle } from "lucide-react"

interface TimelineEvent {
  id: string
  content: string
}

// Memoized draggable event component to prevent unnecessary re-renders
const DraggableEvent = memo(({ event, index }: { event: TimelineEvent; index: number }) => {
  return (
    <Draggable key={event.id} draggableId={event.id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`p-3 rounded-md border-2 flex items-center ${
            snapshot.isDragging
              ? "bg-blue-100 border-blue-400 shadow-lg"
              : "bg-white border-blue-200 hover:border-blue-300"
          }`}
          initial={{ opacity: 1 }}
          animate={{
            scale: snapshot.isDragging ? 1.02 : 1,
            boxShadow: snapshot.isDragging ? "0 10px 25px -5px rgba(0, 0, 0, 0.1)" : "none",
          }}
          transition={{ duration: 0.2 }}
          aria-label={`Evento ${index + 1}: ${event.content}`}
          style={{
            ...provided.draggableProps.style,
            transform: snapshot.isDragging ? provided.draggableProps.style?.transform : "translate(0, 0)",
            transition: snapshot.isDragging ? "none" : "transform 0.2s ease-out",
          }}
        >
          <div
            {...provided.dragHandleProps}
            className="mr-2 p-1 rounded hover:bg-blue-100 cursor-grab active:cursor-grabbing"
            aria-label="Arrastar"
          >
            <GripVertical className="h-5 w-5 text-blue-500" />
          </div>

          <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-3">
            <span className="font-medium text-blue-700">{index + 1}</span>
          </div>

          <div className="flex-1">{event.content}</div>
        </motion.div>
      )}
    </Draggable>
  )
})

DraggableEvent.displayName = "DraggableEvent"

interface TimelineInteractionProps {
  events: TimelineEvent[]
  onComplete: (orderedEvents: string[]) => void
}

export default function TimelineInteraction({ events, onComplete }: TimelineInteractionProps) {
  const [orderedEvents, setOrderedEvents] = useState<TimelineEvent[]>([...events])
  const [isDragging, setIsDragging] = useState(false)
  const [hasReordered, setHasReordered] = useState(false)
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  // Reset hasReordered when events change
  useEffect(() => {
    setHasReordered(false)
    setAttemptedSubmit(false)
  }, [events])

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      setIsDragging(false)
      const { destination, source } = result

      if (!destination) return

      if (destination.droppableId === source.droppableId && destination.index === source.index) return

      const newOrderedEvents = Array.from(orderedEvents)
      const [removed] = newOrderedEvents.splice(source.index, 1)
      newOrderedEvents.splice(destination.index, 0, removed)

      setOrderedEvents(newOrderedEvents)
      setHasReordered(true)

      // Reset attempted submit when user reorders
      if (attemptedSubmit) {
        setAttemptedSubmit(false)
      }
    },
    [orderedEvents, attemptedSubmit],
  )

  const handleSubmit = useCallback(() => {
    if (!hasReordered) {
      setAttemptedSubmit(true)
      return
    }
    onComplete(orderedEvents.map((event) => event.id))
  }, [hasReordered, orderedEvents, onComplete])

  return (
    <div className="space-y-6">
      <p className="text-sm text-blue-600 italic text-center mb-4">
        Arraste os eventos para organizá-los na ordem correta
      </p>

      <div className="border-2 border-blue-200 rounded-lg p-4 bg-white">
        <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <Droppable droppableId="timeline" direction="vertical">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`space-y-2 ${snapshot.isDraggingOver ? "bg-blue-50 p-2 rounded-md" : ""}`}
                aria-label="Lista de eventos para ordenar"
                style={{
                  // Use hardware acceleration for smoother animations
                  transform: "translateZ(0)",
                  willChange: isDragging ? "transform" : "auto",
                }}
              >
                {orderedEvents.map((event, index) => (
                  <DraggableEvent key={event.id} event={event} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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

