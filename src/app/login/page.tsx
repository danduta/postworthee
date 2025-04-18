"use client";

import AuthPanel from "../../components/login/AuthPanel";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Typography, Box, Paper } from "@mui/material";

export default function LoginPage() {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.replace("/");
		}
	}, [user, router]);

	return (
		<Box
			minHeight="100vh"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Paper
				sx={{
					p: "3rem",
					maxWidth: "35rem",
				}}
			>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					gap="1rem"
				>
					<Typography variant="h3" fontWeight="bold" mb="3rem">
						Sign in to PostWorthee
					</Typography>
					<AuthPanel />
				</Box>
			</Paper>
		</Box>
	);
}
