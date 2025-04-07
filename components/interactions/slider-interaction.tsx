"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface SliderInteractionProps {
  min: number
  max: number
  step: number
  label: string
  onSelect: (value: number) => void
}

export default function SliderInteraction({ min, max, step, label, onSelect }: SliderInteractionProps) {
  const [value, setValue] = useState<number[]>([Math.floor((max - min) / 2) + min])

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue)
  }

  const handleSubmit = () => {
    onSelect(value[0])
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-sm text-slate-500 italic mb-6">{label}</p>

        <div className="bg-slate-50 p-6 rounded-lg">
          <div className="text-center mb-8">
            <motion.div
              className="text-4xl font-bold text-slate-800"
              key={value[0]}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {value[0]}
            </motion.div>
          </div>

          <Slider
            defaultValue={value}
            max={max}
            min={min}
            step={step}
            onValueChange={handleValueChange}
            className="w-full"
          />

          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleSubmit} className="bg-slate-700 hover:bg-slate-800 text-white px-8">
          Confirmar Resposta
        </Button>
      </div>
    </div>
  )
}

