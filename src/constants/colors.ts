// constants/colors.ts

export const Colors = {
  // Main Brand Colors
  brand: {
    primary: '#1A1A2E',
    secondary: '#16213E',
    accent: '#E94560',
  },

  // UI Colors
  ui: {
    background: '#F5F6FA',
    card: '#FFFFFF',
    header: '#1A1A2E',
    footer: '#F8F9FA',
  },

  // Text Colors
  text: {
    primary: '#1A1A2E',
    secondary: '#4A4A6A',
    tertiary: '#8A8AA8',
    white: '#FFFFFF',
    price: '#1A1A2E',
    stock: '#22C55E',
    outOfStock: '#EF4444',
  },

  // Category Colors
  categories: {
    oms: '#E94560',
    onesam: '#2563EB',
    hottu: '#F59E0B',
    xpert: '#8B5CF6',
  },

  // Border Colors
  border: {
    light: '#E8E8F0',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
  },

  // Drawer Specific - Exact from image
  drawer: {
    background: '#FFFFFF',
    headerText: '#1A1A2E',
    categoryText: '#1A1A2E',
    subCategoryText: '#4A4A6A',
    selectedBackground: '#F0F0F5',
    selectedText: '#E94560',
    iconColor: '#4A4A6A',
    border: '#E8E8F0',
    overlay: 'rgba(0,0,0,0.5)',
    shopText: '#1A1A2E',
    chargersText: '#4A4A6A',
  },
} as const;