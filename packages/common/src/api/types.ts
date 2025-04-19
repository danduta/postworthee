import { Memory } from "../models/memory";

export type Empty = Record<never, never>;
type ErrorResponse = { error: string };
type SuccessResponse<T> = { data: T };

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export type CreateMemoryRequest = {
	memory_metadata: string;
};

export type CreateMemoryResponse = ApiResponse<{
	memory: Memory;
}>;

export type ListMemoriesRequest = {};

export type ListMemoriesResponse = ApiResponse<{
	memories: Memory[];
}>;
