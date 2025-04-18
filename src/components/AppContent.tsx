"use client";

import { Box, CircularProgress } from "@mui/material";
import AppHeader from "./appbar/AppHeader";
import Sidebar from "./sidebar/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppContent({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = useAuth();
	const router = useRouter();
	const drawerWidth = "clamp(12rem, 20vw, 20rem)";
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!user) {
			router.replace("/login");
			return;
		}

		setLoading(false);
	}, [router, user]);

	return (
		<>
			{loading && (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					minHeight="100vh" // or whatever height you want
				>
					<CircularProgress />
				</Box>
			)}
			{!loading && (
				<>
					<AppHeader />
					<Sidebar />
					<Box
						minHeight="100vh - var(--app-bar-height)"
						display="flex"
						justifyContent="center"
						alignItems="center"
						mt="var(--app-bar-height)"
						ml={drawerWidth}
						padding="3rem"
					>
						{children}
					</Box>
				</>
			)}
		</>
	);
}
