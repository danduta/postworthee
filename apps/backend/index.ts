import express from "express";
import dotenv from "dotenv";
import memoryRoutes from "./routes/memories";
import cors from "cors";
import { initializeFirebaseAdmin } from "./lib/firebase-admin";

dotenv.config({ path: ".env.local" });
initializeFirebaseAdmin();

const app = express();
const port = process.env.PORT || 3001;

app.use(
	cors({
		origin: "http://localhost:3000", // allow frontend dev server
		credentials: true, // optional: if you’re using cookies or headers that require credentials
	})
);

app.use(express.json());
app.use("/api/memories", memoryRoutes);

app.listen(port, () => {
	console.log(`🚀 Backend running at http://localhost:${port}`);
});
