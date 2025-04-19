import { uploadFile } from "../lib/s3";

export class PhotoRepository {
	constructor() {}

	public async uploadPhotos(
		photos: Express.Multer.File[],
		memoryId: string
	): Promise<UploadedPhotos> {
		const uploadedUrls: string[] = [];

		for (const file of photos) {
			const buffer = Buffer.from(await file.buffer);
			const key = `photos/${memoryId}/${file.originalname}`;
			const url = await uploadFile(buffer, key, file.mimetype);
			uploadedUrls.push(url);
		}

		return {
			urls: uploadedUrls,
		};
	}
}

export interface UploadedPhotos {
	urls: string[];
}
