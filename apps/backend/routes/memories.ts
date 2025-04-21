import express, {
	NextFunction,
	Request,
	Response,
	RequestHandler,
} from "express";
import multer from "multer";
import { bootstrapControllers } from "../bootstrap";
import {
	CreateMemoryRequest,
	CreateMemoryResponse,
	CreateMemoryValidationSchema,
	Empty,
	ListMemoriesRequest,
	ListMemoriesResponse,
	ListMemoriesValidationSchema,
} from "@postworthee/common";
import { authenticateFirebaseToken } from "../middleware/auth";
import { asyncHandler } from "../lib/types";
import { validate } from "../middleware/validate";

export type CreateMemoryHandler = RequestHandler<
	Empty,
	CreateMemoryResponse,
	CreateMemoryRequest
>;

export type ListMemoriesHandler = RequestHandler<
	Empty,
	ListMemoriesResponse,
	ListMemoriesRequest
>;

const router = express.Router();
router.use(asyncHandler(authenticateFirebaseToken));

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
	if (!file.mimetype.startsWith("image/")) {
		cb(null, false);
	} else if (file.size > 5 * 1024 * 1024) {
		cb(null, false);
	} else {
		cb(null, true);
	}
};

const storage = multer.memoryStorage();
const upload = multer({
	storage,
	fileFilter,
});

const { memoryController } = bootstrapControllers();

router.post(
	"/create",
	upload.array("photos"),
	validate(CreateMemoryValidationSchema),
	memoryController.create
);

router.get(
	"/list",
	validate(ListMemoriesValidationSchema),
	memoryController.list
);

export default router;
