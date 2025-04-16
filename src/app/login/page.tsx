"use client";
import AuthPanel from "../../components/login/AuthPanel";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";

export default function LoginPage() {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.replace("/");
		}
	}, [user, router]);

	return (
		<Container maxWidth="sm" sx={{ mt: 10 }}>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				gap={4}
			>
				<Typography variant="h4" fontWeight="bold">
					Sign in to PostWorthee
				</Typography>
				<AuthPanel />
			</Box>
		</Container>
	);
}
