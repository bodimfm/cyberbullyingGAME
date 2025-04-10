"use client"

import { useTheme } from "@/contexts/theme-context"
import { themes, ThemeType } from "@/lib/themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Palette } from "lucide-react"

// Helper function para formatar nomes dos temas
const formatThemeName = (theme: string): string => {
  if (theme === 'oabGoias') return "OAB Goiás"
  return theme.charAt(0).toUpperCase() + theme.slice(1)
}

export function ThemeSelector() {
  const { currentTheme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(themes) as ThemeType[]).map((theme) => (
          <DropdownMenuItem
            key={theme}
            onClick={() => setTheme(theme)}
            className={currentTheme === theme ? "bg-accent" : ""}
          >
            {formatThemeName(theme)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}