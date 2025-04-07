"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface Hotspot {
  id: number
  x: number
  y: number
  size: number
  label: string
}

interface HotspotInteractionProps {
  image: string
  hotspots: Hotspot[]
  question: string
  onSelect: (hotspotId: number) => void
}

export default function HotspotInteraction({ image, hotspots, question, onSelect }: HotspotInteractionProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null)
  const [hoveredHotspot, setHoveredHotspot] = useState<number | null>(null)

  const handleHotspotClick = (id: number) => {
    setSelectedHotspot(id)
  }

  const handleSubmit = () => {
    if (selectedHotspot !== null) {
      onSelect(selectedHotspot)
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-purple-500 italic text-center">{question}</p>

      <div className="relative w-full aspect-video bg-purple-50 rounded-lg overflow-hidden">
        <img src={image || "/placeholder.svg"} alt="Scenario" className="w-full h-full object-cover" />

        {hotspots.map((hotspot) => (
          <motion.div
            key={hotspot.id}
            className={`absolute rounded-full cursor-pointer flex items-center justify-center
              ${
                selectedHotspot === hotspot.id
                  ? "bg-purple-600 text-white border-2 border-white"
                  : "bg-white bg-opacity-80 border border-purple-300 hover:bg-purple-100"
              }`}
            style={{
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
              width: `${hotspot.size}px`,
              height: `${hotspot.size}px`,
              transform: "translate(-50%, -50%)",
              zIndex: hoveredHotspot === hotspot.id || selectedHotspot === hotspot.id ? 10 : 1,
            }}
            onClick={() => handleHotspotClick(hotspot.id)}
            onMouseEnter={() => setHoveredHotspot(hotspot.id)}
            onMouseLeave={() => setHoveredHotspot(null)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: selectedHotspot === hotspot.id ? [1, 1.2, 1] : 1,
              boxShadow: selectedHotspot === hotspot.id ? "0 0 0 4px rgba(147, 51, 234, 0.3)" : "none",
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs font-bold">{hotspot.id}</span>

            {(hoveredHotspot === hotspot.id || selectedHotspot === hotspot.id) && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-2 rounded shadow-md text-xs text-purple-800 whitespace-nowrap z-20"
              >
                {hotspot.label}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Button
          onClick={handleSubmit}
          disabled={selectedHotspot === null}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8"
        >
          Confirmar Seleção
        </Button>
      </div>
    </div>
  )
}

