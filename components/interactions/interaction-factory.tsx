"use client"

import MultipleChoiceInteraction from "./multiple-choice-interaction"
import CategorySelectionInteraction from "./category-selection-interaction"
import SliderInteraction from "./slider-interaction"
import ChatInteraction from "./chat-interaction"
import SequenceOrderingInteraction from "./sequence-ordering-interaction"
import HotspotInteraction from "./hotspot-interaction"
import type { InteractionType } from "@/types/game"

const interactionComponents = {
  "multiple-choice": MultipleChoiceInteraction,
  "drag-drop": CategorySelectionInteraction,
  "slider": SliderInteraction,
  "chat": ChatInteraction,
  "timeline": SequenceOrderingInteraction,
  "hotspot": HotspotInteraction
} as const;

interface InteractionFactoryProps {
  type: InteractionType;
  options?: any[];
  items?: any[];
  categories?: string[];
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    label: string;
  };
  chatPrompt?: string;
  timelineEvents?: any[];
  hotspotImage?: string;
  hotspots?: any[];
  hotspotQuestion?: string;
  onSelect?: (value: any) => void;
  onSubmit?: (value: any) => void;
  onComplete?: (value: any) => void;
}

export const InteractionFactory = ({ type, ...props }: InteractionFactoryProps) => {
  const Component = interactionComponents[type];
  if (!Component) {
    return <div>Interaction type not supported</div>;
  }
  // Cast props to any to avoid type errors
  return <Component {...(props as any)} />;
}; 