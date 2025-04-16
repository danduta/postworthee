import { uploadFile } from "@/lib/s3";

export class PhotoRepository {
	constructor() {}

	public async uploadPhotos(
		photos: File[],
		memoryId: string
	): Promise<UploadedPhotos> {
		const uploadedUrls: string[] = [];

		for (const file of photos) {
			const buffer = Buffer.from(await file.arrayBuffer());
			const key = `photos/${memoryId}/${file.name}`;
			const url = await uploadFile(buffer, key, file.type);
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
