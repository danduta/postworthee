import {
	CreateMemoryResponse,
	ListMemoriesResponse,
	Memory,
	MemoryMetadata,
} from "@postworthee/common";
import { MemoryRepository } from "./repository/MemoryRepository";
import { PhotoRepository, UploadedPhotos } from "./repository/PhotoRepository";

export class MemoryService {
	constructor(
		private readonly memoryRepo: MemoryRepository,
		private readonly photoRepo: PhotoRepository
	) {}

	public async createMemory(request: {
		user_id: string;
		memory_metadata: MemoryMetadata;
		photos: Express.Multer.File[];
	}): Promise<CreateMemoryResponse> {
		const memory = await this.memoryRepo.createMemory({
			userId: request.user_id,
			metadata: request.memory_metadata,
		});

		if (!memory) {
			throw new Error("Failed to create new memory");
		}

		const uploadResult: UploadedPhotos = await this.photoRepo.uploadPhotos(
			request.photos,
			memory.id,
			request.user_id
		);

		return {
			data: {
				memory: {
					created: memory.createdAt.getTime(),
					id: memory.id,
					user_id: memory.userId,
					photo_urls: uploadResult.urls,
					memory_metadata: memory.metadata,
				},
			},
		};
	}

	public async getMemories(request: {
		user_id: string;
	}): Promise<ListMemoriesResponse> {
		const memories = await this.memoryRepo.getMemoriesForUser(
			request.user_id
		);
		const promises = memories.map(async (memoryRow) => ({
			created: memoryRow.createdAt.getTime(),
			id: memoryRow.id,
			memory_metadata: memoryRow.metadata,
			user_id: memoryRow.userId,
			photo_urls: (
				await this.photoRepo.getPhotosByMemory(memoryRow.id)
			).map((photoRow) => photoRow.url),
		}));

		const result = await Promise.all(promises);

		return {
			data: {
				memories: result,
			},
		};
	}
}
