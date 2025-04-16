export interface Memory extends MemoryMetadata {
	id: string;
	user_id: string;
	created: number;
	photo_urls: string[];
}

export type MemoryMetadata = {
	title: string;
};
