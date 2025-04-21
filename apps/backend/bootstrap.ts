import { MemoryRepository } from "./service/repository/MemoryRepository";
import { MemoryService } from "./service/MemoryService";
import { MemoryController } from "./controller/MemoryController";
import { PhotoRepository } from "./service/repository/PhotoRepository";
import { MemoryTable } from "./service/table/MemoryTable";
import { Db } from "./db/schema";
import { PhotoTable } from "./service/table/PhotoTable";

export function bootstrapControllers(db: Db) {
	const memoryTable = new MemoryTable(db);
	const photoTable = new PhotoTable(db);
	const memoryRepository = new MemoryRepository(memoryTable);
	const photoRepository = new PhotoRepository(photoTable);
	const memoryService = new MemoryService(memoryRepository, photoRepository);
	const memoryController = new MemoryController(memoryService);

	return {
		memoryController,
	};
}
