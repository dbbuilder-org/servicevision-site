/**
 * ServiceVision Design System
 *
 * Centralized design tokens and component styles
 * Based on Tailwind UI patterns with high-contrast professional palette
 */

// =============================================================================
// COLOR PALETTE
// =============================================================================

export const colors = {
  // Primary - Deep Navy (Trust, Authority, Expertise)
  primary: {
    DEFAULT: '#1e3a5f',
    dark: '#152a45',
    light: '#e8eef4',
  },

  // Secondary - Teal (Innovation, Intelligence, Tech-forward)
  secondary: {
    DEFAULT: '#0891b2',
    dark: '#0e7490',
    light: '#cffafe',
  },

  // Accent - Amber (Prestige, Warmth, Action)
  accent: {
    DEFAULT: '#d97706',
    light: '#fef3c7',
  },

  // Neutrals - Gray scale for text and backgrounds
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const typography = {
  // Font family
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
  },

  // Heading styles
  heading: {
    h1: 'text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl',
    h2: 'text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl',
    h3: 'text-3xl font-semibold tracking-tight text-gray-900',
    h4: 'text-2xl font-semibold text-gray-900',
    h5: 'text-xl font-semibold text-gray-900',
    h6: 'text-lg font-semibold text-gray-900',
  },

  // Body text styles
  body: {
    large: 'text-lg text-gray-600 leading-8',
    default: 'text-base text-gray-600 leading-7',
    small: 'text-sm text-gray-500',
  },

  // Label styles
  label: {
    default: 'text-sm font-semibold text-gray-900',
    muted: 'text-sm font-medium text-gray-500',
  },

  // Eyebrow/kicker text
  eyebrow: 'text-base font-semibold text-primary',
} as const;

// =============================================================================
// COMPONENT STYLES
// =============================================================================

export const components = {
  // Buttons
  button: {
    primary: 'rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors',
    secondary: 'rounded-md bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors',
    ghost: 'text-sm font-semibold text-gray-900 hover:text-primary transition-colors',
  },

  // Cards
  card: {
    default: 'rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200',
    hover: 'rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow',
    feature: 'rounded-2xl bg-gray-50 p-8',
  },

  // Form inputs
  input: {
    default: 'block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary',
  },

  // Badges/Tags
  badge: {
    primary: 'rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary',
    neutral: 'rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700',
  },

  // Icon containers
  icon: {
    primary: 'flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white',
    light: 'flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary',
  },
} as const;

// =============================================================================
// LAYOUT
// =============================================================================

export const layout = {
  // Container widths
  container: {
    default: 'mx-auto max-w-7xl px-6 lg:px-8',
    narrow: 'mx-auto max-w-3xl px-6 lg:px-8',
    wide: 'mx-auto max-w-screen-2xl px-6 lg:px-8',
  },

  // Section padding
  section: {
    default: 'py-24 sm:py-32',
    small: 'py-16 sm:py-24',
    large: 'py-32 sm:py-40',
  },

  // Section backgrounds
  background: {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900',
    primary: 'bg-primary',
  },
} as const;

// =============================================================================
// SPACING
// =============================================================================

export const spacing = {
  // Stack spacing (vertical)
  stack: {
    xs: 'space-y-2',
    sm: 'space-y-4',
    md: 'space-y-6',
    lg: 'space-y-8',
    xl: 'space-y-12',
  },

  // Inline spacing (horizontal)
  inline: {
    xs: 'space-x-2',
    sm: 'space-x-4',
    md: 'space-x-6',
    lg: 'space-x-8',
  },

  // Grid gaps
  grid: {
    sm: 'gap-4',
    md: 'gap-8',
    lg: 'gap-12',
    xl: 'gap-16',
  },
} as const;

// =============================================================================
// ANIMATIONS
// =============================================================================

export const animations = {
  transition: {
    default: 'transition-colors',
    all: 'transition-all',
    shadow: 'transition-shadow',
  },
  duration: {
    fast: 'duration-150',
    default: 'duration-200',
    slow: 'duration-300',
  },
} as const;
