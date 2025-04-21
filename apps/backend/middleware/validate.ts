import { ValidationSchemas } from "@postworthee/common";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate =
	(schemas: ValidationSchemas) =>
	(req: Request, res: Response, next: NextFunction): void => {
		try {
			if (schemas.body) req.body = schemas.body.parse(req.body);
			if (schemas.query) req.query = schemas.query.parse(req.query);
			if (schemas.params) req.params = schemas.params.parse(req.params);
			if (schemas.response) {
				const originalJson = res.json.bind(res);
				res.json = (data: any) => {
					try {
						const parsed = schemas.response!.parse(data);
						return originalJson(parsed);
					} catch (err) {
						if (err instanceof z.ZodError) {
							res.status(400);
							return originalJson({
								message: "Validation error",
								issues: err.errors,
							});
						}

						return originalJson(data);
					}
				};
			}
			next();
		} catch (err) {
			if (err instanceof z.ZodError) {
				res.status(400).json({
					message: "Validation error",
					issues: err.errors,
				});
				return;
			}
			next(err);
		}
	};
