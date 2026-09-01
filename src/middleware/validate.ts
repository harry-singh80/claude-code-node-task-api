import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from './app-error';

export function validateBody(schema: ZodSchema) {
  return (req: Request,_res: Response,next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) { next(new AppError(400,'Validation failed',result.error.flatten())); return; }
    req.body = result.data;
    next();
  };
}
