import { cert, getApps, initializeApp } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../postworthee-82319432cba0.json";

let dbInstance: FirebaseFirestore.Firestore | null = null;
let authInstance: Auth | null = null;

export const initializeFirebaseAdmin = () => {
	if (!getApps().length) {
		if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
			console.log(
				"Using Firebase Auth Emulator at",
				process.env.FIREBASE_AUTH_EMULATOR_HOST
			);
		}

		if (process.env.FIRESTORE_EMULATOR_HOST) {
			console.log(
				"Using Firestore Emulator at",
				process.env.FIRESTORE_EMULATOR_HOST
			);
		}

		const app = initializeApp({
			credential: cert({
				clientEmail: serviceAccount.client_email,
				privateKey: serviceAccount.private_key,
				projectId: serviceAccount.project_id,
			}),
		});

		dbInstance = getFirestore(app);
		authInstance = getAuth(app);
	}
};

export const getDb = () => {
	if (!dbInstance) {
		throw new Error(
			"Firebase Admin not initialized. Call initializeFirebaseAdmin() first."
		);
	}
	return dbInstance;
};

export const authenticateUser = (token: string | undefined) => {
	if (!authInstance) {
		throw new Error(
			"Firebase Admin not initialized. Call initializeFirebaseAdmin() first."
		);
	}

	if (!token) {
		throw new Error("Missing authentication token");
	}

	return authInstance.verifyIdToken(token);
};
