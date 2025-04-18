"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.replace("/login");
			return;
		}

		router.replace("/dashboard");
	}, [router, user]);

	return <></>;
}
