import cors from 'cors';
import express, { Express } from 'express';
import { TaskController } from './controllers/task.controller';
import { errorHandler, notFoundHandler } from './middleware/error-handler';
import { TaskRepository } from './repositories/task.repository';
import { createTaskRouter } from './routes/task.routes';
import { TaskService } from './services/task.service';
import { InMemoryTaskStorage } from './storage/in-memory-task-storage';
import { TaskStorage } from './storage/task-storage';

export function createApp(storage: TaskStorage = new InMemoryTaskStorage()): Express {
  const app = express();
  app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:3001' }));
  app.use(express.json());

  const repository = new TaskRepository(storage);
  const service = new TaskService(repository);
  const controller = new TaskController(service);

  app.get('/health', (_req, res) => {
    res.json({ success: true, message: 'API is healthy' });
  });

  app.use('/api/tasks', createTaskRouter(controller));
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
