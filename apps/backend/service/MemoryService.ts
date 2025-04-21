import {
	CreateMemoryResponse,
	ListMemoriesResponse,
	Memory,
	MemoryMetadata,
} from "@postworthee/common";
import { MemoryRepository } from "../repository/MemoryRepository";
import { PhotoRepository, UploadedPhotos } from "../repository/PhotoRepository";
import { getDb } from "../lib/firebase-admin";

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
		const memoryBase = {
			user_id: request.user_id,
			title: request.memory_metadata.title,
			created: Date.now(),
		};

		const doc = await getDb()
			.collection("users/")
			.doc(request.user_id)
			.collection("memories")
			.add(memoryBase);

		const uploadResult: UploadedPhotos = await this.photoRepo.uploadPhotos(
			request.photos,
			doc.id
		);

		const memory: Memory = {
			...memoryBase,
			id: doc.id,
			photo_urls: uploadResult.urls,
		};

		await getDb()
			.collection("users/")
			.doc(request.user_id)
			.collection("memories")
			.doc(doc.id)
			.update({ ...memory });

		return {
			data: {
				memory,
			},
		};
	}

	public async getMemories(request: {
		user_id: string;
	}): Promise<ListMemoriesResponse> {
		const collectionRef = getDb()
			.collection("users/")
			.doc(request.user_id)
			.collection("memories");

		const response = await collectionRef.get();
		return {
			data: {
				memories: response.docs
					.map((doc) => doc.data() as Memory)
					.sort((a, b) => a.created - b.created),
			},
		};
	}
}
