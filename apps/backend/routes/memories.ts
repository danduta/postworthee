import express, { Request, RequestHandler } from "express";
import multer from "multer";
import { bootstrapControllers } from "../bootstrap";
import {
	CreateMemoryRequest,
	CreateMemoryResponse,
	Empty,
	ListMemoriesRequest,
	ListMemoriesResponse,
} from "@postworthee/common";

export type CreateMemoryHandler = RequestHandler<
	Empty,
	CreateMemoryResponse,
	CreateMemoryRequest
>;

export type LsitMemoriesHandler = RequestHandler<
	Empty,
	ListMemoriesResponse,
	ListMemoriesRequest
>;
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const { memoryController } = bootstrapControllers();

router.post("/create", upload.array("photos"), (req, res, next) =>
	memoryController.create(req, res, next)
);

router.get("/list", (req, res, next) => memoryController.list(req, res, next));

export default router;
