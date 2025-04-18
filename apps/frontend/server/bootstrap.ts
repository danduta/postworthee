import { MemoryRepository } from "./repository/MemoryRepository";
import { PhotoRepository } from "./repository/PhotoRepository";
import { MemoryService } from "./service/MemoryService";

const memoryRepo: MemoryRepository = new MemoryRepository();
const photosRepo: PhotoRepository = new PhotoRepository();
const memoryService: MemoryService = new MemoryService(
	memoryRepo,
	photosRepo
);

export { memoryService as userMemoryService };
