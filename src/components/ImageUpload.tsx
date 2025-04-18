import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

interface FileUploadProps {
	onFilesSelected: (files: File[]) => void;
}

export default function ImageUpload({ onFilesSelected }: FileUploadProps) {
	const [fileCount, setFileCount] = useState<number>(0);
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			onFilesSelected(Array.from(event.target.files));
			setFileCount(event.target.files.length);
			return;
		}
	};

	return (
		<Stack>
			<input
				accept="image/*"
				multiple
				id="upload-button"
				type="file"
				style={{ display: "none" }}
				onChange={handleFileChange}
			/>
			<label htmlFor="upload-button">
				<Button
					variant="contained"
					component="span"
					startIcon={<UploadIcon />}
				>
					Upload Images
				</Button>
			</label>
			<Typography variant="body2" color="textSecondary" mt="0.5em">
				{fileCount > 0
					? `${fileCount} ${
							fileCount > 1 ? "images" : "image"
					  } selected.`
					: "You can upload multiple images (JPG, PNG)."}
			</Typography>
		</Stack>
	);
}
