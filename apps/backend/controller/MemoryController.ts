import { MemoryService } from "../service/MemoryService";
import {
	CreateMemoryHandler,
	ListMemoriesHandler as ListMemoriesHandler,
} from "../routes/memories";

export class MemoryController {
	constructor(private memoryService: MemoryService) {}

	public create: CreateMemoryHandler = async (req, res): Promise<void> => {
		try {
			const { memory_metadata } = req.body;
			const files = req.files as Express.Multer.File[];
			if (!files || files.length === 0) {
				res.status(400).json({
					error: "At least one file that meets the criteria is required.",
				});
				return;
			}

			const result = await this.memoryService.createMemory({
				user_id: req.user.uid,
				memory_metadata: memory_metadata,
				photos: files,
			});
			res.status(201).json(result);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	};

	public list: ListMemoriesHandler = async (req, res): Promise<void> => {
		try {
			const result = await this.memoryService.getMemories({
				user_id: req.user.uid,
			});
			res.status(200).json(result);
		} catch (err: any) {
			console.error(err);
			res.status(500).json({ error: "Internal server error" });
		}
	};
}
