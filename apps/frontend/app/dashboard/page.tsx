"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Typography } from "@mui/material";

export default function DashboardPage() {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.replace("/login");
		}
	}, [user, router]);

	if (!user) return null;

	return (
		<Typography variant="h4" marginTop="2rem" gutterBottom align="center">
			Welcome, {user.displayName}!
		</Typography>
	);
}
