"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full max-w-xs bg-purple-200 rounded-full h-2.5 overflow-hidden">
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2.5"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}

