"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full max-w-xs bg-blue-100 rounded-full h-2.5 overflow-hidden">
      <motion.div
        className="bg-gradient-to-r from-oab-blue-DEFAULT to-oab-blue-light h-2.5"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}

