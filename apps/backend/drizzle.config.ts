import type { Config } from "drizzle-kit";

export default {
	schema: "./db/schema.ts",
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
		host: process.env.DATABASE_URL || "localhost:5432",
		user: "postgres",
		password: "password",
		database: "postworthee",
	},
} satisfies Config;
