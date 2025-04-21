import {
	MemoryMetadata,
	MemoryMetadataSchema,
	MemorySchema,
} from "../models/memory";
import { z, ZodSchema, ZodTypeAny } from "zod";

export type ValidationSchemas = {
	body?: ZodSchema;
	query?: ZodSchema;
	params?: ZodSchema;
	response?: ZodSchema;
};

export const zStringifiedJson = <T extends ZodTypeAny, Z>(schema: T) =>
	z.string().transform<Z>((val, ctx) => {
		try {
			const parsed = JSON.parse(val);
			return schema.parse(parsed);
		} catch (err) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Invalid JSON format or structure",
			});
			return z.NEVER;
		}
	});

const ApiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
	z.object({ data: dataSchema });

const ApiErrorSchema = z.object({ error: z.string() });

const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
	z.union([ApiSuccessSchema(dataSchema), ApiErrorSchema]);

export const CreateMemoryRequestSchema = z.object({
	memory_metadata: zStringifiedJson<
		typeof MemoryMetadataSchema,
		z.infer<typeof MemoryMetadataSchema>
	>(MemoryMetadataSchema),
});
export const CreateMemoryResponseSchema = ApiResponseSchema(
	z.object({
		memory: MemorySchema,
	})
);

export const CreateMemoryValidationSchema: ValidationSchemas = {
	body: CreateMemoryRequestSchema,
	response: CreateMemoryResponseSchema,
};

export const ListMemoriesRequestSchema = z.object({});
export const ListMemoriesResponseSchema = ApiResponseSchema(
	z.object({
		memories: z.array(MemorySchema),
	})
);

export const ListMemoriesValidationSchema: ValidationSchemas = {
	body: ListMemoriesRequestSchema,
	response: ListMemoriesResponseSchema,
};
