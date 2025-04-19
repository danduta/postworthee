import express, { Request, RequestHandler } from "express";
import multer from "multer";
import { bootstrapControllers } from "../bootstrap";
import { ApiResponse, Empty } from "../lib/types";
import { CreateMemoryRequest, CreateMemoryResponse } from "@postworthee/common";

export type CreateMemoryHandler = RequestHandler<
	Empty,
	ApiResponse<CreateMemoryResponse>,
	CreateMemoryRequest
>;

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const { memoryController } = bootstrapControllers();

router.post("/create", upload.array("photos"), (req, res, next) =>
	memoryController.create(req, res, next)
);

export default router;
