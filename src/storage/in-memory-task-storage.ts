import { Task } from '../models/task';
import { TaskStorage } from './task-storage';

export class InMemoryTaskStorage implements TaskStorage {
  private readonly tasks = new Map<string, Task>();
  async list(): Promise<Task[]> { return Array.from(this.tasks.values()).sort((a,b) => b.createdAt.localeCompare(a.createdAt)); }
  async get(id: string): Promise<Task | null> { return this.tasks.get(id) ?? null; }
  async set(task: Task): Promise<void> { this.tasks.set(task.id, task); }
  async delete(id: string): Promise<boolean> { return this.tasks.delete(id); }
  async clear(): Promise<void> { this.tasks.clear(); }
}
