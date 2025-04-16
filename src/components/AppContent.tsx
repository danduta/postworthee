"use client";

import { useAppBarHeight } from "@/context/AppBarHeightContext";
import { Box } from "@mui/material";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";

export default function AppContent({
	children,
}: {
	children: React.ReactNode;
}) {
	const { height } = useAppBarHeight();
	const drawerWidth = "clamp(12rem, 20vw, 20rem)";

	return (
		<>
			<AppHeader />
			<Sidebar />
			<Box sx={{ mt: `${height}px`, ml: drawerWidth }}>{children}</Box>
		</>
	);
}
