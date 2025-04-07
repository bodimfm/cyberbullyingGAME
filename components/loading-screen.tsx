"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Image src="/images/mascot-clipboard.png" alt="Loading" width={30} height={30} />
        </motion.div>
      </div>
      <p className="mt-4 text-purple-700 font-medium">Carregando...</p>
    </div>
  )
}

