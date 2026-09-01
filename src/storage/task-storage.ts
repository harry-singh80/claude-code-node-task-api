import { Task } from '../models/task';

export interface TaskStorage {
  list(): Promise<Task[]>;
  get(id: string): Promise<Task | null>;
  set(task: Task): Promise<void>;
  delete(id: string): Promise<boolean>;
  clear(): Promise<void>;
}
