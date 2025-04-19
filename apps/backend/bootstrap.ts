import { MemoryRepository } from "./repository/MemoryRepository";
import { MemoryService } from "./service/MemoryService";
import { MemoryController } from "./controller/MemoryController";
import { PhotoRepository } from "./repository/PhotoRepository";

export function bootstrapControllers() {
	const memoryRepository = new MemoryRepository();
	const photoRepository = new PhotoRepository();
	const memoryService = new MemoryService(memoryRepository, photoRepository);
	const memoryController = new MemoryController(memoryService);

	return {
		memoryController,
	};
}
