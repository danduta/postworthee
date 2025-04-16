import {
	cert,
	getApps,
	initializeApp,
} from "firebase-admin/app";

import serviceAccount from "../../postworthee-82319432cba0.json";
import { getFirestore } from "firebase-admin/firestore";

const adminApp =
	getApps().length === 0
		? initializeApp({
				credential: cert({
					clientEmail: serviceAccount.client_email,
					privateKey: serviceAccount.private_key,
					projectId: serviceAccount.project_id,
				}),
		  })
		: getApps()[0];

const db = getFirestore(adminApp);

export { adminApp, db };
