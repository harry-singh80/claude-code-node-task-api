import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { validateBody } from '../middleware/validate';
import { createTaskSchema, updateTaskSchema } from '../validation/task.schema';

export function createTaskRouter(controller: TaskController): Router {
  const router = Router();
  router.get('/',controller.list);
  router.get('/:id',controller.getById);
  router.post('/',validateBody(createTaskSchema),controller.create);
  router.put('/:id',validateBody(updateTaskSchema),controller.update);
  router.delete('/:id',controller.delete);
  return router;
}
