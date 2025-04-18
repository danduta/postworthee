import { Memory, MemoryMetadata } from "@/models/memory";
import { MemoryRepository } from "@/server/repository/MemoryRepository";
import { PhotoRepository, UploadedPhotos } from "../repository/PhotoRepository";
import { db } from "@/lib/firebase-admin";

export class MemoryService {
	constructor(
		private readonly memoryRepo: MemoryRepository,
		private readonly photoRepo: PhotoRepository
	) {}

	public async createMemory(
		request: CreateMemoryRequest
	): Promise<CreateMemoryResponse> {
		console.log(request);
		const memoryBase = {
			user_id: request.user_id,
			title: request.memory_metadata.title,
			created: Date.now(),
		};

		const doc = await db
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

		await db
			.collection("users/")
			.doc(request.user_id)
			.collection("memories")
			.doc(doc.id)
			.update({ ...memory });

		return {
			memory,
		};
	}
}

export interface CreateMemoryRequest {
	memory_metadata: MemoryMetadata;
	user_id: string;
	photos: File[];
}

export interface CreateMemoryResponse {
	memory: Memory;
}
