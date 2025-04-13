import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4f46e5", // Indigo 600
    },
    secondary: {
      main: "#ec4899", // Pink 500
    },
    background: {
      default: "#f9fafb", // Gray 50
    },
    text: {
      primary: "#111827", // Gray 900
    },
    success: {
      main: "#10b981", // Green 500 (accent)
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 600, fontSize: "2.5rem" },
    h2: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
});
export default theme;
