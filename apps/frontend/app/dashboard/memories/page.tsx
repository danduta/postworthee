"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MemoriesPage() {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.replace("/login");
		}

		router.replace("/dashboard/memories/overview");
	}, [user, router]);
}
