"use client";
import { Memory } from "@postworthee/common";
import {
	Box,
	CircularProgress,
	ImageList,
	ImageListItem,
	Paper,
	Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

function SquareImage({
	url,
	aspectRatio = 1, // optional: pass aspectRatio like 2 (wider) or 0.75 (taller)
}: {
	url: string;
	aspectRatio?: number;
}) {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const img = new Image();
		img.src = url;
		img.onload = () => setLoaded(true);
		img.onerror = () => setLoaded(true); // optional: stop spinner on error too
	}, [url]);

	return (
		<Box
			sx={{
				position: "relative",
				width: "100%",
				borderRadius: 1,
				overflow: "hidden",
				aspectRatio: aspectRatio,
			}}
		>
			{!loaded && (
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						zIndex: 1,
					}}
				>
					<CircularProgress size={24} />
				</Box>
			)}
			{loaded && (
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
						overflow: "hidden",
					}}
				/>
			)}
		</Box>
	);
}

function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

interface MemoryComponentProps {
	value: Memory;
}

export default function MemoryComponent({
	value: memory,
}: MemoryComponentProps) {
	const photos = shuffleArray(memory.photo_urls ?? []).slice(0, 4);
	const count = photos?.length || 0;

	const imgTemplate = () => {
		switch (count) {
			case 1:
				// 1 row 1 col
				return [[2, 2]];
			case 2:
				// 1 row 2 col
				return [
					[1, 2],
					[1, 2],
				];
			case 3:
				// 2 col 2 row
				return [
					[2, 1],
					[1, 1],
					[1, 1],
				];
			default:
				// 2 col 2 row
				return [
					[1, 1],
					[1, 1],
					[1, 1],
					[1, 1],
				];
		}
	};

	return (
		<Paper
			sx={{
				padding: "1em",
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<ImageList cols={2} sx={{ flexGrow: 1, overflow: "hidden" }}>
				{photos.map((url, index) => {
					const [rows, cols] = imgTemplate()[index];
					return (
						<ImageListItem
							key={index}
							rows={rows}
							cols={cols}
							sx={{
								overflow: "hidden",
							}}
						>
							<SquareImage url={url} aspectRatio={cols / rows} />
						</ImageListItem>
					);
				})}
			</ImageList>
			<Typography>{memory.title}</Typography>
		</Paper>
	);
}
