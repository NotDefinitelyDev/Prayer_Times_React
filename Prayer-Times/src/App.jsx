import React, { useState } from "react";
import { ThemeProvider, CssBaseline, IconButton, Box } from "@mui/material";
import { lightTheme, darkTheme } from "./theme ";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import MainContent from "./comps/mainContent";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const activeTheme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />

      {/* خلفية الصفحة بالكامل */}
      <Box
        sx={{
          minHeight: "100vh",
          minWidth: "100vw",
          backgroundColor: activeTheme.palette.background.default,
          color: activeTheme.palette.text.primary,
          transition: "all 0.3s ease",
          padding: "50px",
        }}
      >
        {/* زر تغيير الثيم */}
        <Box sx={{ position: "fixed", top: 10, right: 10, zIndex: 999 }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        {/* المحتوى الرئيسي */}
        <MainContent />
      </Box>
    </ThemeProvider>
  );
}

export default App;
