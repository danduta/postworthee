"use client";
import { Memory } from "@/models/memory";
import { Box, Grid, Paper, Typography } from "@mui/material";

function SquareImage({ url }: { url: string }) {
	return (
		<Box
			component="img"
			src={url}
			loading="lazy"
			sx={{
				width: "100%",
				height: "100%",
				objectFit: "cover",
				display: "block",
				borderRadius: 1,
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
	const photos = memory.photo_urls?.slice(0, 4);
	const count = photos?.length || 0;

	const gridTemplate = () => {
		switch (count) {
			case 1:
				return [12]; // full height
			case 2:
				return [6, 6]; // full height
			case 3:
				return [6, 3, 3]; // full height
			default:
				return [6, 6, 6, 6]; // half height
		}
	};

	return (
		<Paper
			sx={{
				width: "clamp(10rem, 100%, 40rem)",
				padding: "1em",
			}}
		>
			<Grid container spacing={0.5} sx={{ height: "10rem" }}>
				{photos.map((url, index) => (
					<Grid
						size={{ xs: gridTemplate()[index] }}
						key={index}
						sx={{ height: count === 4 ? "50%" : "100%" }}
					>
						<SquareImage url={url} />
					</Grid>
				))}
			</Grid>
			<Typography mt="1em" variant="h3">
				{memory.title}
			</Typography>
		</Paper>
	);
}
