export const themes = {
  default: {
    primary: '#0078c8',
    secondary: '#3ab0f8',
    accent: '#7dcbfc',
    background: '#ffffff',
    text: '#1a1a1a',
    border: '#e5e7eb'
  },
  highContrast: {
    primary: '#005a9e',
    secondary: '#007bd9',
    accent: '#009aff',
    background: '#ffffff',
    text: '#000000',
    border: '#000000'
  },
  kids: {
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    accent: '#ffe66d',
    background: '#ffffff',
    text: '#2d3436',
    border: '#dfe6e9',
    success: '#06d6a0',
    error: '#ff7675',
    warning: '#ffd93d'
  }
} as const;

export type ThemeType = keyof typeof themes;
export type ThemeColors = typeof themes[ThemeType];