import { Db, memories } from "../../db/schema";
import { eq } from "drizzle-orm";

export class MemoryTable {
	constructor(private readonly db: Db) {}

	public async findByUserId(userId: string): Promise<MemoryRow[]> {
		return this.db
			.select()
			.from(memories)
			.where(eq(memories.userId, userId));
	}

	public async insert(row: MemoryInsertRow): Promise<MemoryRow | null> {
		const result = await this.db.insert(memories).values(row).returning();

		if (!result || result.length === 0) {
			return null;
		}

		return result[0];
	}
}

export type MemoryRow = typeof memories.$inferSelect;
export type MemoryInsertRow = Omit<
	typeof memories.$inferInsert,
	"id" | "createdAt"
>;
