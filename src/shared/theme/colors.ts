/**
 * Design token colors — single source of truth, mirrors shared/theme/theme.css
 * oklch values are converted to hex approximations for React Native compatibility.
 * Use these in Tailwind config (mobile.expo) and React Native StyleSheet directly.
 */
export const colors = {
  // --- Semantic tokens (light mode) ---
  background: "#ffffff",
  foreground: "#1c1c1e", // oklch(0.145 0 0)
  card: "#ffffff",
  cardForeground: "#1c1c1e", // oklch(0.145 0 0)
  popover: "#ffffff", // oklch(1 0 0)
  popoverForeground: "#1c1c1e",
  primary: "#030213",
  primaryForeground: "#ffffff", // oklch(1 0 0)
  secondary: "#f0f0f8", // oklch(0.95 0.0058 264.53)
  secondaryForeground: "#030213",
  muted: "#ececf0",
  mutedForeground: "#717182",
  accent: "#e9ebef",
  accentForeground: "#030213",
  destructive: "#d4183d",
  destructiveForeground: "#ffffff",
  border: "rgba(0,0,0,0.1)",
  input: "transparent",
  inputBackground: "#f3f3f5",
  switchBackground: "#cbced4",
  ring: "#a1a1aa", // oklch(0.708 0 0)

  // Charts
  chart1: "#fb923c", // oklch(0.646 0.222 41.116)
  chart2: "#2dd4bf", // oklch(0.6 0.118 184.704)
  chart3: "#334155", // oklch(0.398 0.07 227.392)
  chart4: "#fde68a", // oklch(0.828 0.189 84.429)
  chart5: "#fbbf24", // oklch(0.769 0.188 70.08)

  // Sidebar
  sidebar: "#fafafa", // oklch(0.985 0 0)
  sidebarForeground: "#1c1c1e",
  sidebarPrimary: "#030213",
  sidebarPrimaryForeground: "#fafafa",
  sidebarAccent: "#f7f7f7", // oklch(0.97 0 0)
  sidebarAccentForeground: "#282828", // oklch(0.205 0 0)
  sidebarBorder: "#e8e8e8", // oklch(0.922 0 0)
  sidebarRing: "#a1a1aa",

  // --- Semantic tokens (dark mode) ---
  darkMode: {
    foreground: "#fafafa", // oklch(0.985 0 0)
    card: "#1c1c1e",
    cardForeground: "#fafafa",
    popover: "#1c1c1e",
    popoverForeground: "#fafafa",
    primary: "#fafafa",
    primaryForeground: "#282828", // oklch(0.205 0 0)
    secondary: "#363636", // oklch(0.269 0 0)
    secondaryForeground: "#fafafa",
    muted: "#363636",
    mutedForeground: "#a1a1aa",
    accent: "#363636",
    accentForeground: "#fafafa",
    destructive: "#7f1d1d", // oklch(0.396 0.141 25.723)
    destructiveForeground: "#f87171", // oklch(0.637 0.237 25.331)
    border: "#363636",
    input: "#363636",
    ring: "#636363", // oklch(0.439 0 0)
    chart1: "#6366f1", // oklch(0.488 0.243 264.376)
    chart2: "#34d399", // oklch(0.696 0.17 162.48)
    chart3: "#fbbf24", // oklch(0.769 0.188 70.08)
    chart4: "#c084fc", // oklch(0.627 0.265 303.9)
    chart5: "#f97316", // oklch(0.645 0.246 16.439)
    sidebar: "#282828", // oklch(0.205 0 0)
    sidebarForeground: "#fafafa",
    sidebarPrimary: "#6366f1",
    sidebarPrimaryForeground: "#fafafa",
    sidebarAccent: "#363636",
    sidebarAccentForeground: "#fafafa",
    sidebarBorder: "#363636",
    sidebarRing: "#636363",
  },

  // --- Brand palette ---
  yellow: {
    50: "#fffef5",
    100: "#fffacc",
    200: "#fff799",
    300: "#fff466",
    400: "#ffee33",
    500: "#ffdd00",
    600: "#ccb100",
    700: "#998500",
    800: "#665800",
    900: "#332c00",
  },
  green: {
    50: "#e6faf3",
    100: "#b3f0d9",
    200: "#80e6bf",
    300: "#4ddca5",
    400: "#1ad28b",
    500: "#0bb35c",
    600: "#098f4a",
    700: "#076b37",
    800: "#054725",
    900: "#022412",
  },
  red: {
    50: "#ffebe6",
    100: "#ffc2b3",
    200: "#ff9980",
    300: "#ff704d",
    400: "#ff471a",
    500: "#fc5230",
    600: "#ca4226",
    700: "#97311d",
    800: "#652113",
    900: "#32100a",
  },
  purple: {
    50: "#f3f0fe",
    100: "#dbd3fc",
    200: "#c3b6fa",
    300: "#ab99f8",
    400: "#937cf6",
    500: "#8b74fc",
    600: "#6f5dca",
    700: "#534697",
    800: "#382f65",
    900: "#1c1732",
  },
  dark: {
    50: "#e5e5e5",
    100: "#b8b8b8",
    200: "#8a8a8a",
    300: "#5c5c5c",
    400: "#2e2e2e",
    500: "#191817",
    600: "#141312",
    700: "#0f0e0e",
    800: "#0a0a09",
    900: "#050505",
  },
  brandGray: {
    50: "#f5f5f5",
    100: "#e3e3e3",
    200: "#d1d1d1",
    300: "#bfbfbf",
    400: "#adadad",
    500: "#737373",
    600: "#5c5c5c",
    700: "#454545",
    800: "#2e2e2e",
    900: "#171717",
  },
} as const;

export type Colors = typeof colors;
