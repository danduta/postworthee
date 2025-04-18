import { getAuth } from "firebase-admin/auth";
import { adminApp } from "./firebase-admin";
import { NextRequest } from "next/server";

export async function getUserFromRequest(req: NextRequest) {
	const authHeader = req.headers.get("Authorization");
	const token = authHeader?.split("Bearer ")[1];
	if (!token) return null;

	try {
		const decoded = await getAuth(adminApp).verifyIdToken(token);
		return decoded;
	} catch (err) {
		console.error("Auth error:", err);
		return null;
	}
}
