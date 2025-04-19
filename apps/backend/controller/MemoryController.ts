import { MemoryService } from "../service/MemoryService";
import { CreateMemoryHandler } from "../routes/memories";
import { authenticateUser } from "../lib/firebase-admin";

export class MemoryController {
	constructor(private memoryService: MemoryService) {}

	public create: CreateMemoryHandler = async (req, res) => {
		try {
			const token = req.header("Authorization")?.split("Bearer ")?.[1];
			const user_id = await authenticateUser(token);

			const { memory_metadata } = req.body;
			const files = req.files as Express.Multer.File[];

			const result = await this.memoryService.createMemory({
				user_id: user_id.uid,
				memory_metadata: JSON.parse(memory_metadata),
				photos: files,
			});
			res.status(201).json({ data: result });
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	};
}
