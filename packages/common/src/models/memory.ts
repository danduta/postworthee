import { z } from "zod";

export const MemoryMetadataSchema = z.object({
	title: z.string().min(1),
});
export type MemoryMetadata = z.infer<typeof MemoryMetadataSchema>;

export const MemorySchema = MemoryMetadataSchema.extend({
	id: z.string(),
	user_id: z.string(),
	created: z.number(),
	photo_urls: z.array(z.string().url()),
});

export type Memory = z.infer<typeof MemorySchema>;
