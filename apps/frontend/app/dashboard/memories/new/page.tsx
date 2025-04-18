"use client";

import CreateMemory from "../../../../components/memories/CreateMemory";
import { Typography } from "@mui/material";

export default function MemoriesAddPage() {
	return (
		<CreateMemory>
			<Typography variant="h2" gutterBottom>
				Your memory lane awaits!
			</Typography>
		</CreateMemory>
	);
}
