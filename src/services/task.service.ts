import { randomUUID } from 'crypto';
import { CreateTaskInput, Task, UpdateTaskInput } from '../models/task';
import { TaskRepository } from '../repositories/task.repository';
import { AppError } from '../middleware/app-error';

export class TaskService {
  constructor(private readonly repository: TaskRepository) {}
  list(): Promise<Task[]> { return this.repository.findAll(); }
  async getById(id: string): Promise<Task> { const task = await this.repository.findById(id); if (!task) throw new AppError(404,'Task not found'); return task; }
  async create(input: CreateTaskInput): Promise<Task> {
    const now = new Date().toISOString();
    return this.repository.save({ id: randomUUID(), title: input.title, description: input.description, completed: input.completed ?? false, createdAt: now, updatedAt: now });
  }
  async update(id: string, input: UpdateTaskInput): Promise<Task> {
    const existing = await this.getById(id);
    return this.repository.save({ ...existing, ...input, id: existing.id, createdAt: existing.createdAt, updatedAt: new Date().toISOString() });
  }
  async delete(id: string): Promise<void> { await this.getById(id); await this.repository.delete(id); }
}
