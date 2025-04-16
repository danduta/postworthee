"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import CreateMemory from "./CreateMemory";

export default function MemoriesDashboardPage() {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.replace("/login");
		}
	}, [user, router]);

	if (!user) return null;

	return (
		<CreateMemory>
			<Typography variant="h2" gutterBottom>
				Your memory lane awaits!
			</Typography>
			<Typography variant="h4" gutterBottom>
				Ready to make the best out of your favorite moments? Add some
				photos and start building your memory collection.
			</Typography>
		</CreateMemory>
	);
}
