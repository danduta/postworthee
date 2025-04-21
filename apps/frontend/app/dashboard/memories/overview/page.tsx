"use client";

import { ListMemoriesResponse, Memory } from "@postworthee/common";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import NoMemories from "../../../../components/memories/NoMemories";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import MemoryComponent from "../../../../components/memories/MemoryComponent";
import { useRouter } from "next/navigation";

export default function MemoriesOverviewPage() {
	const auth = useAuth();
	const router = useRouter();

	const [memories, setMemories] = useState<Memory[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMemories = async () => {
			if (!auth.user) {
				router.replace("/login");
				return;
			}

			try {
				const res = await fetch(
					"http://localhost:3001/api/memories/list",
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${await auth.user.getIdToken()}`,
						},
					}
				);

				if (!res.ok) throw new Error("Failed to get memories");
				const resJson: ListMemoriesResponse = await res.json();
				if ("error" in resJson)
					throw new Error("Failed to get memories");

				setMemories(resJson.data.memories);
			} catch (err: unknown) {
				console.log(err);
				if (!(err instanceof Error)) {
					console.error("Unkown error encountered", err);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchMemories();
	}, [auth.user, router]);

	return (
		<>
			{loading ? (
				<CircularProgress />
			) : memories.length > 0 ? (
				<Grid
					container
					columns={{ md: 4, sm: 2, xs: 1 }}
					justifyContent="center"
					alignItems="center"
					spacing={2}
				>
					{memories.map((memory) => (
						<Grid key={memory.id} size={1}>
							<Box
								sx={{
									width: "100%",
									height: "100%",
									aspectRatio: "1 / 1",
								}}
							>
								<MemoryComponent value={memory} />
							</Box>
						</Grid>
					))}
				</Grid>
			) : (
				<NoMemories />
			)}
		</>
	);
}
