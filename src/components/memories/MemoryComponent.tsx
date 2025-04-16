"use client";
import { Memory } from "@/models/memory";
import { Box, Grid, Paper, Typography } from "@mui/material";

function SquareImage({ url, index }: { url: string; index: number }) {
	return (
		<Box
			key={index}
			component="img"
			src={url}
			loading="lazy"
			sx={{
				width: "100%",
				aspectRatio: "1 / 1",
				objectFit: "cover",
				display: "block",
			}}
		/>
	);
}

interface MemoryComponentProps {
	value: Memory;
}

export default function MemoryComponent({
	value: memory,
}: MemoryComponentProps) {
	return (
		<Paper
			sx={{
				width: "clamp(10rem, auto, 20rem)",
				padding: "3em",
			}}
		>
			<Typography variant="h3" gutterBottom>
				{memory.title}
			</Typography>
			<Grid container columns={2}>
				{memory.photo_urls?.slice(0, 4).map((url, index) => (
					<Grid size={1} key={index}>
						<SquareImage key={index} url={url} index={index} />
					</Grid>
				))}
			</Grid>
		</Paper>
	);
}
