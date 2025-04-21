import { z } from "zod";
import {
	CreateMemoryRequestSchema,
	CreateMemoryResponseSchema,
	ListMemoriesRequestSchema,
	ListMemoriesResponseSchema,
} from "./schemas";

export type Empty = Record<never, never>;

export type CreateMemoryRequest = z.infer<typeof CreateMemoryRequestSchema>;
export type CreateMemoryResponse = z.infer<typeof CreateMemoryResponseSchema>;

export type ListMemoriesRequest = z.infer<typeof ListMemoriesRequestSchema>;
export type ListMemoriesResponse = z.infer<typeof ListMemoriesResponseSchema>;
