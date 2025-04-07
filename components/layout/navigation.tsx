"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Info, HelpCircle } from "lucide-react"

interface NavigationProps {
  onNavigate: (page: string) => void
  currentPage: string
}

export default function Navigation({ onNavigate, currentPage }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleNavigate = (page: string) => {
    onNavigate(page)
    setIsOpen(false)
  }

  const navItems = [
    { id: "home", label: "Início", icon: <Home className="h-5 w-5" /> },
    { id: "about", label: "Sobre", icon: <Info className="h-5 w-5" /> },
    { id: "help", label: "Ajuda", icon: <HelpCircle className="h-5 w-5" /> },
  ]

  return (
    <nav className="relative z-50" aria-label="Navegação principal">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMenu}
        className="fixed top-4 right-4 bg-white shadow-md border-blue-200 z-50"
        aria-expanded={isOpen}
        aria-label="Menu de navegação"
      >
        {isOpen ? <X className="h-5 w-5 text-blue-700" /> : <Menu className="h-5 w-5 text-blue-700" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full bg-white shadow-lg w-64 p-4 pt-16"
          >
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left p-3 ${
                      currentPage === item.id
                        ? "bg-blue-100 text-blue-800 font-medium"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                    onClick={() => handleNavigate(item.id)}
                    aria-current={currentPage === item.id ? "page" : undefined}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>

            <div className="absolute bottom-8 left-0 right-0 px-4">
              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className="text-xs text-gray-500 text-center">
                  © {new Date().getFullYear()} Rafael Maciel Sociedade de Advogados
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  )
}

