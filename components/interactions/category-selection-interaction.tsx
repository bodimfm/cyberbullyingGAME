"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"

interface CategorySelectionProps {
  items: { id: string; content: string }[]
  categories: { id: string; name: string }[]
  onComplete: (result: Record<string, string[]>) => void
}

export default function CategorySelectionInteraction({ items, categories, onComplete }: CategorySelectionProps) {
  // State to track which items are in which categories
  const [categorizedItems, setCategorizedItems] = useState<Record<string, string[]>>(() => {
    const initialMap: Record<string, string[]> = {}
    categories.forEach((category) => {
      initialMap[category.id] = []
    })
    return initialMap
  })

  // State to track which items haven't been categorized yet
  const [uncategorizedItems, setUncategorizedItems] = useState<string[]>(items.map((item) => item.id))

  // State to track which item is currently selected
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  // State to track if all items have been categorized
  const [allItemsCategorized, setAllItemsCategorized] = useState(false)

  // State to track if user attempted to submit without categorizing all items
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  // Check if all items are categorized
  useEffect(() => {
    setAllItemsCategorized(uncategorizedItems.length === 0)
    if (attemptedSubmit && uncategorizedItems.length === 0) {
      setAttemptedSubmit(false)
    }
  }, [uncategorizedItems, attemptedSubmit])

  // Function to handle selecting an item
  const handleSelectItem = (itemId: string) => {
    setSelectedItem(itemId)
  }

  // Function to handle assigning an item to a category
  const handleAssignToCategory = (categoryId: string) => {
    if (!selectedItem) return

    // Add item to the selected category
    setCategorizedItems((prev) => ({
      ...prev,
      [categoryId]: [...prev[categoryId], selectedItem],
    }))

    // Remove item from uncategorized items
    setUncategorizedItems((prev) => prev.filter((id) => id !== selectedItem))

    // Clear selection
    setSelectedItem(null)
  }

  // Function to handle removing an item from a category
  const handleRemoveFromCategory = (categoryId: string, itemId: string) => {
    // Remove item from the category
    setCategorizedItems((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId].filter((id) => id !== itemId),
    }))

    // Add item back to uncategorized items
    setUncategorizedItems((prev) => [...prev, itemId])
  }

  // Function to handle submission
  const handleSubmit = () => {
    if (!allItemsCategorized) {
      setAttemptedSubmit(true)
      return
    }

    // Make sure we have all categories represented, even if empty
    const finalCategorizedItems = { ...categorizedItems };
    
    // Ensure all categories exist in the result
    categories.forEach(category => {
      if (!finalCategorizedItems[category.id]) {
        finalCategorizedItems[category.id] = [];
      }
    });
    
    // Log what we're sending, for debugging
    if (process.env.NODE_ENV !== 'production') {
      console.log('Submitting categorized items:', finalCategorizedItems);
    }
    
    onComplete(finalCategorizedItems);
  }

  // Helper function to get item content by ID
  const getItemContent = (itemId: string) => {
    return items.find((item) => item.id === itemId)?.content || ""
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-blue-600 italic text-center mb-4">
        Selecione um item e clique em uma categoria para classificá-lo
      </p>

      {/* Uncategorized items */}
      <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-100 mb-4">
        <h3 className="font-medium text-blue-700 mb-3">Itens disponíveis:</h3>

        <div className="min-h-[80px] flex flex-wrap gap-2 items-center rounded-md p-2">
          {uncategorizedItems.length === 0 ? (
            <div className="flex items-center justify-center w-full text-blue-500 py-4">
              <CheckCircle className="w-5 h-5 mr-2" />
              <p className="text-sm">Todos os itens foram classificados</p>
            </div>
          ) : (
            uncategorizedItems.map((itemId) => (
              <motion.button
                key={itemId}
                onClick={() => handleSelectItem(itemId)}
                className={`p-3 rounded-md text-sm ${
                  selectedItem === itemId
                    ? "bg-blue-700 text-white shadow-md"
                    : "bg-white border border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                aria-label={`Selecionar item: ${getItemContent(itemId)}`}
                aria-pressed={selectedItem === itemId}
              >
                {getItemContent(itemId)}
              </motion.button>
            ))
          )}
        </div>
      </div>

      {/* Selected item indicator */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-100 p-3 rounded-lg border border-blue-300 text-center"
        >
          <p className="text-blue-800 font-medium">Item selecionado:</p>
          <p className="text-blue-700">{getItemContent(selectedItem)}</p>
          <p className="text-sm text-blue-600 mt-1">Clique em uma categoria abaixo para classificar este item</p>
        </motion.div>
      )}

      {/* Categories */}
      <div className="grid md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white border-2 border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-blue-700">{category.name}</h3>

              {selectedItem && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleAssignToCategory(category.id)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                >
                  <ArrowRight className="h-4 w-4 mr-1" /> Adicionar
                </Button>
              )}
            </div>

            <div className="min-h-[120px] rounded-md p-2 bg-gray-50 border border-gray-200">
              {categorizedItems[category.id].length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400 text-sm text-center my-auto p-4">Nenhum item nesta categoria</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {categorizedItems[category.id].map((itemId) => (
                    <motion.div
                      key={itemId}
                      className="p-3 rounded-md text-sm bg-white border border-blue-200 flex items-center gap-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>{getItemContent(itemId)}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveFromCategory(category.id, itemId)}
                        className="h-6 w-6 p-0 rounded-full hover:bg-red-100 hover:text-red-700"
                        aria-label={`Remover item ${getItemContent(itemId)} da categoria ${category.name}`}
                      >
                        <ArrowLeft className="h-3 w-3" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-6">
        {attemptedSubmit && !allItemsCategorized && (
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
          disabled={!allItemsCategorized}
          className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 h-auto transition-all duration-300 ${
            !allItemsCategorized ? "opacity-70" : "shadow-md hover:shadow-lg"
          }`}
          aria-label="Confirmar classificação dos itens"
        >
          Confirmar Classificação
        </Button>
      </div>
    </div>
  )
}

