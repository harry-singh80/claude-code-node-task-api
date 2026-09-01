import { Task } from '../models/task';
import { TaskStorage } from '../storage/task-storage';

export class TaskRepository {
  constructor(private readonly storage: TaskStorage) {}
  findAll(): Promise<Task[]> { return this.storage.list(); }
  findById(id: string): Promise<Task | null> { return this.storage.get(id); }
  async save(task: Task): Promise<Task> { await this.storage.set(task); return task; }
  delete(id: string): Promise<boolean> { return this.storage.delete(id); }
}
