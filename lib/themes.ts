export const themes = {
  default: {
    primary: '#005691',    // Azul OAB
    secondary: '#C00000',  // Vermelho OAB
    accent: '#6496c1',     // Azul OAB mais claro
    background: '#ffffff',
    text: '#1a1a1a',
    border: '#e5e7eb',
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b'
  },
  oabGoias: {
    primary: '#005691',    // Azul OAB
    secondary: '#C00000',  // Vermelho OAB
    accent: '#6496c1',     // Azul OAB mais claro
    background: '#ffffff',
    text: '#1a1a1a',
    border: '#e5e7eb',
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b'
  },
  highContrast: {
    primary: '#005a9e',
    secondary: '#d00000',
    accent: '#009aff',
    background: '#ffffff',
    text: '#000000',
    border: '#000000',
    success: '#008800',
    error: '#cc0000',
    warning: '#cc6600'
  },
  kids: {
    primary: '#005691',    // Adaptado para o azul da OAB
    secondary: '#C00000',  // Adaptado para o vermelho da OAB
    accent: '#6496c1',     // Azul OAB mais claro
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