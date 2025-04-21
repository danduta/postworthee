import { uploadFile } from "../../lib/s3";
import { PhotoRow, PhotoTable } from "../table/PhotoTable";

export class PhotoRepository {
	constructor(private readonly table: PhotoTable) {}

	public async uploadPhotos(
		photos: Express.Multer.File[],
		memoryId: string,
		userId: string
	): Promise<UploadedPhotos> {
		const uploadedUrls: string[] = [];

		for (const file of photos) {
			const buffer = Buffer.from(file.buffer);
			const key = `photos/${memoryId}/${file.originalname}`;
			const url = await uploadFile(buffer, key, file.mimetype);
			uploadedUrls.push(url);
		}

		await this.table.insertMany(
			uploadedUrls.map((url) => ({
				url,
				userId,
				memoryId,
			}))
		);

		return {
			urls: uploadedUrls,
		};
	}

	public async getPhotosByMemory(memoryId: string): Promise<PhotoRow[]> {
		return this.table.findByMemoryId(memoryId);
	}
}

export interface UploadedPhotos {
	urls: string[];
}
