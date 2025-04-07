"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, User, Bot } from "lucide-react"

interface ChatInteractionProps {
  prompt: string
  onSubmit: (response: string) => void
}

export default function ChatInteraction({ prompt, onSubmit }: ChatInteractionProps) {
  const [messages, setMessages] = useState<{ role: "system" | "user"; content: string }[]>([
    { role: "system", content: prompt },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])

    // Simulate typing indicator
    setIsTyping(true)

    // Clear input
    setInput("")

    // Submit the user's response after a short delay
    setTimeout(() => {
      setIsTyping(false)
      onSubmit(input.trim())
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-slate-50 p-3 border-b">
        <h3 className="font-medium text-slate-700">Simulação de Chat</h3>
      </div>

      <div className="h-[300px] overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === "user" ? "bg-slate-700 ml-2" : "bg-slate-500 mr-2"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={`p-3 rounded-lg ${
                  message.role === "user" ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-800"
                }`}
              >
                {message.content}
              </div>
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center mr-2">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="p-3 rounded-lg bg-slate-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-[bounce_1s_infinite]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-[bounce_1s_infinite_0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-[bounce_1s_infinite_0.4s]"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t">
        <div className="flex">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua resposta..."
            className="flex-grow resize-none"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            className="ml-2 bg-slate-700 hover:bg-slate-800 text-white"
            disabled={!input.trim() || isTyping}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

