"use client";

import { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../lib/theme"; // your custom MUI theme file (can be defaultTheme)

export default function ThemeRegistry({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
