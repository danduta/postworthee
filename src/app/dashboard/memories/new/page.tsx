"use client";

import DashboardLayout from "@/components/DashboardLayout";
import CreateMemory from "../components/CreateMemory";
import { Typography } from "@mui/material";

export default function MemoriesAddPage() {
	return (
		<DashboardLayout>
			<CreateMemory>
				<Typography variant="h2" gutterBottom>
					Your memory lane awaits!
				</Typography>
			</CreateMemory>
		</DashboardLayout>
	);
}
