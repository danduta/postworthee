import { NextRequest, NextResponse } from "next/server";
import { MemoryMetadata } from "@/models/memory";
import { userMemoryService } from "@/server/bootstrap";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
	const user = await getUserFromRequest(req);
	if (!user) {
		return NextResponse.json(
			{
				error: "Unauthorized",
			},
			{
				status: 401,
			}
		);
	}

	const formData = await req.formData();

	const metadataJson = formData.get("metadata");
	if (typeof metadataJson !== "string") {
		return NextResponse.json(
			{ error: "Missing metadata" },
			{ status: 400 }
		);
	}

	const photoFiles: File[] = [...formData.entries()]
		.filter(([k, v]) => k !== "metadata" && v instanceof File)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.map(([_, v]) => v as File);

	const metadata: MemoryMetadata = JSON.parse(metadataJson);
	const response = await userMemoryService.createMemory({
		memory_metadata: metadata,
		photos: photoFiles,
		user_id: user.uid,
	});

	return NextResponse.json(response);
}
