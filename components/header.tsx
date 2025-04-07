"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="https://www.rafaelmaciel.com.br" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/logo.png"
              alt="Rafael Maciel Sociedade de Advogados"
              width={150}
              height={60}
              className="h-12 w-auto"
            />
          </a>
        </motion.div>
        <motion.div
          className="text-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Cyberbullying
          </h1>
          <p className="text-sm text-blue-600">Game educativo para prevenção e combate.</p>
        </motion.div>
      </div>
    </header>
  )
}

