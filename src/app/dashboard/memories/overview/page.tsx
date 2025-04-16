"use client";

import { Memory } from "@/models/memory";
import { CircularProgress, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import NoMemories from "../components/NoMemories";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import MemoryComponent from "../components/MemoryComponent";

export default function MemoriesOverviewPage() {
	const [memories, setMemories] = useState<Memory[]>([]);
	const [loading, setLoading] = useState(true);
	const auth = useAuth();

	useEffect(() => {
		const fetchMemories = async () => {
			if (!auth.user) {
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
	}, [auth.user]);

	return (
		<>
			{loading ? (
				<CircularProgress />
			) : memories.length > 0 ? (
				<Grid container columns={10} sx={{ width: "100%" }}>
					{memories.map((memory) => (
						<Grid key={memory.id} size={1}>
							<MemoryComponent key={memory.id} value={memory} />
						</Grid>
					))}
				</Grid>
			) : (
				<NoMemories />
			)}
		</>
	);
}
