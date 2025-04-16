import {
	CreateBucketCommand,
	HeadBucketCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";

export const s3 = new S3Client({
	endpoint: process.env.MINIO_ENDPOINT || "http://localhost:9000",
	region: "us-east-1",
	credentials: {
		accessKeyId: process.env.MINIO_ACCESS_KEY || "minioadmin",
		secretAccessKey: process.env.MINIO_SECRET_KEY || "minioadmin",
	},
	forcePathStyle: true,
});

export async function getUrl(key: string): Promise<string> {
	const bucket = process.env.MINIO_BUCKET!;
	const baseUrl = process.env.MINIO_PUBLIC_URL!;

	return `${baseUrl}/${bucket}/${key}`;
}

async function ensureBucketExists(bucket: string) {
	try {
		await s3.send(new HeadBucketCommand({ Bucket: bucket }));
		console.log(`✅ Bucket "${bucket}" exists`);
	} catch (err: any) {
		if (err.name === "NotFound" || err.$metadata?.httpStatusCode === 404) {
			console.log(`Bucket "${bucket}" not found. Creating...`);
			await s3.send(new CreateBucketCommand({ Bucket: bucket }));
			console.log(`Bucket "${bucket}" created`);
		} else {
			throw err;
		}
	}
}

export async function uploadFile(
	buffer: Buffer,
	key: string,
	contentType: string
): Promise<string> {
	await ensureBucketExists(process.env.MINIO_BUCKET!);
	await s3.send(
		new PutObjectCommand({
			Bucket: process.env.MINIO_BUCKET!,
			Key: key,
			Body: buffer,
			ContentType: contentType,
			ACL: "public-read",
		})
	);

	return getUrl(key);
}
