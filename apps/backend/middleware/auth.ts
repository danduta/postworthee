import { NextFunction, Request, Response } from "express";
import { authenticateUser } from "../lib/firebase-admin";

export const authenticateFirebaseToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader?.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ message: "Missing or invalid Authorization header" });
	}

	const idToken = authHeader.split("Bearer ")[1];

	try {
        const decodedToken = await authenticateUser(idToken);
		(req as Request).user = decodedToken; // Add user info to request
		next();
	} catch (error) {
		console.error("Token verification failed", error);
		res.status(401).json({ message: "Unauthorized" });
	}
};
