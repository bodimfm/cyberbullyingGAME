"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { AlertCircle, CheckCircle } from "lucide-react"

// Memoized draggable item component to prevent unnecessary re-renders
const DraggableItem = memo(
  ({
    id,
    index,
    content,
    isDragging,
  }: {
    id: string
    index: number
    content: string
    isDragging: boolean
  }) => {
    return (
      <Draggable key={id} draggableId={id} index={index}>
        {(provided, snapshot) => (
          <motion.div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`p-3 rounded-md text-sm ${
              snapshot.isDragging
                ? "bg-blue-700 text-white shadow-lg scale-105 z-50"
                : "bg-white border border-blue-200 hover:border-blue-400 hover:bg-blue-50"
            }`}
            style={{
              ...provided.draggableProps.style,
              margin: "0 4px 4px 0",
              transform: snapshot.isDragging ? provided.draggableProps.style?.transform : "translate(0, 0)",
              transition: snapshot.isDragging ? "none" : "transform 0.2s ease-out",
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            aria-label={`Item: ${content}`}
          >
            {content}
          </motion.div>
        )}
      </Draggable>
    )
  },
)

DraggableItem.displayName = "DraggableItem"

interface DragDropInteractionProps {
  items: { id: string; content: string }[]
  categories: { id: string; name: string }[]
  onComplete: (result: Record<string, string[]>) => void
}

export default function DragDropInteraction({ items, categories, onComplete }: DragDropInteractionProps) {
  const [itemMap, setItemMap] = useState<Record<string, string[]>>(() => {
    const initialMap: Record<string, string[]> = { items: items.map((item) => item.id) }
    categories.forEach((category) => {
      initialMap[category.id] = []
    })
    return initialMap
  })

  const [isDragging, setIsDragging] = useState(false)
  const [allItemsAssigned, setAllItemsAssigned] = useState(false)
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  // Check if all items are assigned whenever itemMap changes
  useEffect(() => {
    setAllItemsAssigned(itemMap.items.length === 0)
    // Reset attempted submit when items change
    if (attemptedSubmit && itemMap.items.length === 0) {
      setAttemptedSubmit(false)
    }
  }, [itemMap, attemptedSubmit])

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      setIsDragging(false)
      const { source, destination } = result

      // Dropped outside a droppable area
      if (!destination) return

      // Same position
      if (source.droppableId === destination.droppableId && source.index === destination.index) return

      // Create copies of source and destination lists
      const sourceList = Array.from(itemMap[source.droppableId])
      const destList =
        source.droppableId === destination.droppableId ? sourceList : Array.from(itemMap[destination.droppableId])

      // Remove from source list
      const [removed] = sourceList.splice(source.index, 1)

      // Insert into destination list
      if (source.droppableId === destination.droppableId) {
        sourceList.splice(destination.index, 0, removed)
      } else {
        destList.splice(destination.index, 0, removed)
      }

      // Update state with animation
      setItemMap({
        ...itemMap,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destList,
      })
    },
    [itemMap],
  )

  const handleSubmit = useCallback(() => {
    if (!allItemsAssigned) {
      setAttemptedSubmit(true)
      return
    }

    // Filter out the 'items' category from the result
    const result = { ...itemMap }
    delete result.items
    onComplete(result)
  }, [allItemsAssigned, itemMap, onComplete])

  const getItemById = useCallback(
    (id: string) => {
      return items.find((item) => item.id === id)?.content || ""
    },
    [items],
  )

  return (
    <div className="space-y-6">
      <p className="text-sm text-blue-600 italic text-center mb-4">Arraste os itens para as categorias corretas</p>

      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {/* Items to be dragged */}
        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-100 mb-4">
          <h3 className="font-medium text-blue-700 mb-3">Itens disponíveis:</h3>
          <Droppable droppableId="items" direction="horizontal" isDropDisabled={false}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`min-h-[80px] flex flex-wrap gap-2 items-center ${
                  snapshot.isDraggingOver ? "bg-blue-100 border-2 border-dashed border-blue-300" : ""
                } rounded-md p-2 transition-colors duration-300`}
                aria-label="Lista de itens disponíveis"
                style={{
                  // Use hardware acceleration for smoother animations
                  transform: "translateZ(0)",
                  willChange: isDragging ? "transform" : "auto",
                }}
              >
                {itemMap.items.length === 0 ? (
                  <div className="flex items-center justify-center w-full text-blue-500 py-4">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <p className="text-sm">Todos os itens foram classificados</p>
                  </div>
                ) : (
                  itemMap.items.map((itemId, index) => (
                    <DraggableItem
                      key={itemId}
                      id={itemId}
                      index={index}
                      content={getItemById(itemId)}
                      isDragging={isDragging}
                    />
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white border-2 border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-700 mb-2">{category.name}</h3>
              <Droppable droppableId={category.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[120px] rounded-md p-2 ${
                      snapshot.isDraggingOver
                        ? "bg-blue-50 border-2 border-dashed border-blue-300"
                        : "bg-gray-50 border border-gray-200"
                    } transition-all duration-300`}
                    aria-label={`Categoria: ${category.name}`}
                    style={{
                      // Use hardware acceleration for smoother animations
                      transform: "translateZ(0)",
                      willChange: isDragging ? "transform" : "auto",
                    }}
                  >
                    {itemMap[category.id].length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400 text-sm text-center my-auto p-4">
                          {isDragging ? "Solte aqui" : "Arraste itens para cá"}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {itemMap[category.id].map((itemId, index) => (
                          <DraggableItem
                            key={itemId}
                            id={itemId}
                            index={index}
                            content={getItemById(itemId)}
                            isDragging={isDragging}
                          />
                        ))}
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <div className="flex flex-col items-center mt-6">
        {attemptedSubmit && !allItemsAssigned && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 flex items-center mb-3"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            <span className="text-sm">Por favor, classifique todos os itens antes de continuar</span>
          </motion.div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!allItemsAssigned}
          className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 h-auto transition-all duration-300 ${
            !allItemsAssigned ? "opacity-70" : "shadow-md hover:shadow-lg"
          }`}
          aria-label="Confirmar classificação dos itens"
        >
          Confirmar Classificação
        </Button>
      </div>
    </div>
  )
}

