import { Response } from "express";

export type Empty = Record<never, never>;
type ErrorResponse = { error: string };
type SuccessResponse<T> = { data: T };

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
