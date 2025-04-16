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
		h2: { fontWeight: 600, fontSize: "2rem" },
		h3: { fontWeight: 600, fontSize: "1.5rem" },
		h4: { fontWeight: 300, fontSize: "1rem" },
		button: { textTransform: "none", fontWeight: 600 },
	},
	shape: {
		borderRadius: 16,
	},
	components: {
		MuiPaper: {
			defaultProps: {
				elevation: 3,
			},
			styleOverrides: {
				root: {
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
					transition: "box-shadow 0.3s ease",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					padding: "0.5rem 0.8rem",
					fontSize: "1rem",
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				":root": {
					"--app-bar-height": "4rem",
				},
			},
		},
	},
});
export default theme;
