"use client";

import { Memory } from "@/models/memory";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import NoMemories from "../../../../components/memories/NoMemories";
import { db } from "@/lib/firebase";
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

			const collectionRef = collection(
				db,
				"users",
				auth.user.uid,
				"memories"
			);

			const response = await getDocs(collectionRef);
			const memories = response.docs
				.map((doc) => doc.data() as Memory)
				.sort((a, b) => a.created - b.created);
			setMemories(memories);
			setLoading(false);
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
