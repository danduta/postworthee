import { Db, photos } from "../../db/schema";
import { eq } from "drizzle-orm";

export class PhotoTable {
	constructor(private readonly db: Db) {}

	public async insert(row: PhotoInsertRow): Promise<string | null> {
		const result = await this.db.insert(photos).values(row).returning();
		if (!result || result.length === 0) {
			return null;
		}

		return result[0].id;
	}

	public async insertMany(rows: PhotoInsertRow[]): Promise<string[] | null> {
		const results = await this.db.insert(photos).values(rows).returning();
		if (!results || results.length === 0) {
			return null;
		}

		return results.map((result) => result.id);
	}

	public async findByMemoryId(memoryId: string): Promise<PhotoRow[]> {
		const results = await this.db
			.select()
			.from(photos)
			.where(eq(photos.memoryId, memoryId));
		if (!results || results.length === 0) {
			return [];
		}

		return results;
	}
}

export type PhotoRow = typeof photos.$inferSelect;
export type PhotoInsertRow = Omit<
	typeof photos.$inferInsert,
	"id" | "createdAt"
>;
