import { NextFunction, Request, Response } from 'express';
import { AppError } from './app-error';

export function notFoundHandler(req: Request,_res: Response,next: NextFunction): void { next(new AppError(404,`Route not found: ${req.method} ${req.originalUrl}`)); }
export function errorHandler(error: Error,_req: Request,res: Response,_next: NextFunction): void {
  if (error instanceof AppError) { res.status(error.statusCode).json({success:false,error:{message:error.message,details:error.details}}); return; }
  console.error(error); res.status(500).json({success:false,error:{message:'Internal server error'}});
}
