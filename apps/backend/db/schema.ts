import { MemoryMetadata } from "@postworthee/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { pgTable, uuid, text, timestamp, json } from "drizzle-orm/pg-core";

export const memories = pgTable("memories", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: text("user_id").notNull(),
	metadata: json("metadata").$type<MemoryMetadata>().notNull(),
	createdAt: timestamp("created", { withTimezone: false })
		.notNull()
		.defaultNow(),
});

export const photos = pgTable("photos", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: text("user_id").notNull(),
	url: text("url").notNull(),
	memoryId: uuid("memory_id").references(() => memories.id),
	createdAt: timestamp("created", { withTimezone: false })
		.notNull()
		.defaultNow(),
});

export const schema = { memories, photos };
export type PostwortheeSchema = typeof schema;
export type Db = NodePgDatabase<PostwortheeSchema>;
