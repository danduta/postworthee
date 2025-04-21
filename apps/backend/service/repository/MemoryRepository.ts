import { MemoryInsertRow, MemoryRow, MemoryTable } from "../table/MemoryTable";

export class MemoryRepository {
	constructor(private readonly table: MemoryTable) {}

	public async createMemory(
		data: MemoryInsertRow
	): Promise<MemoryRow | null> {
		return this.table.insert(data);
	}

	public async getMemoriesForUser(userId: string): Promise<MemoryRow[]> {
		return this.table.findByUserId(userId);
	}
}
