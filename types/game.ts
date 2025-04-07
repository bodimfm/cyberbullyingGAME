import type { ReactNode } from "react"

export type GameState = "intro" | "playing" | "feedback" | "results"
export type Difficulty = "beginner" | "intermediate" | "advanced"
export type InteractionType = "multiple-choice" | "drag-drop" | "slider" | "chat" | "timeline" | "hotspot"

export interface Scenario {
  id: string
  text: string
  icon: ReactNode
  difficulty: Difficulty | "all"
  interactionType: InteractionType

  // For multiple-choice
  options?: string[]

  // Common
  correctAnswer: number | string[] | Record<string, string[]>

  // For drag-drop
  items?: { id: string; content: string }[]
  categories?: { id: string; name: string }[]

  // For slider
  sliderConfig?: {
    min: number
    max: number
    step: number
    label: string
    unit?: string
  }

  // For chat
  chatPrompt?: string

  // For timeline
  timelineEvents?: { id: string; content: string }[]

  // For hotspot
  hotspotImage?: string
  hotspots?: { id: number; x: number; y: number; size: number; label: string }[]
  hotspotQuestion?: string

  // Feedback
  correctFeedback: string
  incorrectFeedback: string
  additionalInfo: string
  legalInfo?: string

  // UI
  context?: string
  mascot?: "clipboard" | "dpo"
}

export interface Answer {
  scenarioId: string
  userAnswer: any
  isCorrect: boolean
  interactionType: InteractionType
}

