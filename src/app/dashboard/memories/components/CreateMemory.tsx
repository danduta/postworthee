import ImageUpload from "@/components/ImageUpload";
import { auth } from "@/lib/firebase";
import { MemoryMetadata } from "@/models/memory";
import { Box, TextField, Button, Alert, Paper } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateMemory(props: PropsWithChildren) {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [files, setFiles] = useState<File[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async () => {
		setLoading(true);
		setError(null);

		const token = await auth.currentUser?.getIdToken();
		const metadata: MemoryMetadata = {
			title,
		};

		const formData = new FormData();
		formData.append("metadata", JSON.stringify(metadata));
		files.forEach((file) => {
			formData.append("file", file);
		});

		try {
			const res = await fetch("/api/memories", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});

			if (!res.ok) throw new Error("Failed to upload memory");
			router.push(`/dashboard/memories/overview`);
		} catch (err: unknown) {
			console.log(err);
			if (!(err instanceof Error)) {
				console.error("Unkown error encountered", err);
			} else {
				setError(err.message);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Paper
			sx={{
				padding: "3em",
				mt: "3em",
				width: "fit-content",
				mx: "auto",
			}}
		>
			{props.children}
			<Box
				display="flex"
				sx={{
					margin: "1em",
					marginTop: props.children ? "3em" : "1em",
				}}
			>
				<TextField
					fullWidth
					required
					label="Name that moment!"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					helperText="Like 'Rome 2024 🛵' or 'Best. Roadtrip. Ever.'"
				/>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="start"
			>
				<ImageUpload
					onFilesSelected={(files: File[]) => {
						setFiles(files);
					}}
				/>

				<Button
					variant="contained"
					onClick={handleSubmit}
					disabled={loading}
				>
					{loading ? "Uploading..." : "Submit"}
				</Button>
			</Box>
			{error && (
				<Alert severity="error" sx={{ mt: "1em" }}>
					An error occurred while uploading your photos.
				</Alert>
			)}
		</Paper>
	);
}
