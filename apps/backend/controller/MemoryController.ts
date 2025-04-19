import { MemoryService } from "../service/MemoryService";
import {
	CreateMemoryHandler,
	LsitMemoriesHandler as ListMemoriesHandler,
} from "../routes/memories";
import { authenticateUser } from "../lib/firebase-admin";

export class MemoryController {
	constructor(private memoryService: MemoryService) {}

	public create: CreateMemoryHandler = async (req, res) => {
		try {
			const token = req.header("Authorization")?.split("Bearer ")?.[1];
			const user = await authenticateUser(token);

			const { memory_metadata } = req.body;
			const files = req.files as Express.Multer.File[];

			const result = await this.memoryService.createMemory({
				user_id: user.uid,
				memory_metadata: JSON.parse(memory_metadata),
				photos: files,
			});
			res.status(201).json(result);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	};

	public list: ListMemoriesHandler = async (req, res) => {
		const token = req.header("Authorization")?.split("Bearer ")?.[1];
		console.log(token);
		const user = await authenticateUser(token);

		res.status(200).json(
			await this.memoryService.getMemories({ user_id: user.uid })
		);
	};
}
