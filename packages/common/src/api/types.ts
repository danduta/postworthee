import { MemoryMetadata, Memory } from "../models/memory";

export interface CreateMemoryRequest {
	memory_metadata: string;
}

export interface CreateMemoryResponse {
	memory: Memory;
}
