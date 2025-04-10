"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ThemeSelector } from "./theme-selector"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-t-4 border-oab-red-DEFAULT">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="https://www.oabgo.org.br" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/logo.png"
              alt="OAB GOIÁS"
              width={150}
              height={60}
              className="h-12 w-auto"
            />
          </a>
        </motion.div>
        <div className="flex items-center gap-4">
          <motion.div
            className="text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-xl font-bold bg-gradient-to-r from-oab-blue-DEFAULT to-oab-blue-dark bg-clip-text text-transparent">
              Cyberbullying
            </h1>
            <p className="text-sm text-oab-red-DEFAULT">Game educativo para prevenção e combate.</p>
          </motion.div>
          <ThemeSelector />
        </div>
      </div>
    </header>
  )
}

