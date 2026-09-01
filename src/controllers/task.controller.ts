import { NextFunction, Request, Response } from 'express';
import { TaskService } from '../services/task.service';

export class TaskController {
  constructor(private readonly service: TaskService) {}
  list = async (_req: Request,res: Response,next: NextFunction): Promise<void> => { try { res.json({success:true,data:await this.service.list()}); } catch(e){next(e);} };
  getById = async (req: Request,res: Response,next: NextFunction): Promise<void> => { try { res.json({success:true,data:await this.service.getById(req.params.id)}); } catch(e){next(e);} };
  create = async (req: Request,res: Response,next: NextFunction): Promise<void> => { try { res.status(201).json({success:true,data:await this.service.create(req.body)}); } catch(e){next(e);} };
  update = async (req: Request,res: Response,next: NextFunction): Promise<void> => { try { res.json({success:true,data:await this.service.update(req.params.id,req.body)}); } catch(e){next(e);} };
  delete = async (req: Request,res: Response,next: NextFunction): Promise<void> => { try { await this.service.delete(req.params.id); res.status(204).send(); } catch(e){next(e);} };
}
