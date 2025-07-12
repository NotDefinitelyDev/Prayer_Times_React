// src/theme.js
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f9f9f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#111",
    },
  },
  typography: {
    fontFamily: "Cairo, sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Cairo, sans-serif",
  },
});
