"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import type { ReactNode } from "react";

export const HOLO = "linear-gradient(100deg, #7cf7ff 0%, #b79cff 48%, #ff8fd8 100%)";

/** Cam panel görünümü: yarı saydam, arkası bulanık */
export const glass = {
  background: "rgba(15, 15, 21, 0.62)",
  backdropFilter: "blur(18px) saturate(150%)",
  WebkitBackdropFilter: "blur(18px) saturate(150%)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
} as const;

const display = "var(--font-display), 'Arial Black', sans-serif";
const mono = "var(--font-mono), ui-monospace, monospace";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#f4f2ee", contrastText: "#07070a" },
    secondary: { main: "#b79cff", contrastText: "#07070a" },
    background: { default: "#07070a", paper: "#101016" },
    text: { primary: "#f4f2ee", secondary: "rgba(244, 242, 238, 0.68)" },
    divider: "rgba(255, 255, 255, 0.1)",
    error: { main: "#ff7d8e" },
  },
  shape: { borderRadius: 18 },
  typography: {
    fontFamily: "var(--font-body), system-ui, sans-serif",
    h1: { fontFamily: display, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.04, fontSize: "clamp(2.2rem, 5.3vw, 5.1rem)" },
    h2: { fontFamily: display, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08, fontSize: "clamp(1.8rem, 3.7vw, 3.4rem)" },
    h3: { fontFamily: display, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15, fontSize: "clamp(1.25rem, 1.9vw, 1.7rem)" },
    h4: { fontFamily: display, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2, fontSize: "1.1rem" },
    body1: { fontSize: "1.0625rem", lineHeight: 1.65 },
    body2: { fontSize: "0.95rem", lineHeight: 1.6 },
    overline: { fontFamily: mono, fontSize: "0.72rem", letterSpacing: "0.14em", lineHeight: 1.4 },
    caption: { fontFamily: mono, fontSize: "0.72rem", letterSpacing: "0.04em" },
    button: { textTransform: "none", fontWeight: 700, fontSize: "0.95rem" },
  },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { backgroundColor: "#07070a" } } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, paddingInline: 22, minHeight: 46 },
        outlined: { borderColor: "rgba(255,255,255,0.28)", "&:hover": { borderColor: "#fff", background: "rgba(255,255,255,0.06)" } },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiChip: { styleOverrides: { root: { fontFamily: mono, fontSize: "0.74rem", borderRadius: 999 } } },
    MuiTab: { styleOverrides: { root: { textTransform: "none", fontWeight: 700, minHeight: 56, alignItems: "flex-start", textAlign: "left" } } },
    MuiAccordion: { styleOverrides: { root: { "&::before": { display: "none" } } } },
    MuiToggleButton: { styleOverrides: { root: { textTransform: "none", borderRadius: 999, fontFamily: mono, fontSize: "0.74rem" } } },
    MuiDialog: { styleOverrides: { paper: { borderRadius: 26 } } },
    MuiTooltip: { styleOverrides: { tooltip: { fontFamily: mono } } },
  },
});

export function Registry({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: "derinlik" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
