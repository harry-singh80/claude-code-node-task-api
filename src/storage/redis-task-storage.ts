import { createClient, RedisClientType } from 'redis';
import { Task } from '../models/task';
import { TaskStorage } from './task-storage';

const HASH_KEY = 'claude-code-demo:tasks';
export class RedisTaskStorage implements TaskStorage {
  private readonly client: RedisClientType;
  constructor(redisUrl: string) {
    this.client = createClient({ url: redisUrl });
    this.client.on('error', (error) => console.error('Redis error:', error.message));
  }
  async connect(): Promise<void> { if (!this.client.isOpen) await this.client.connect(); }
  private async ensureConnected(): Promise<void> { if (!this.client.isOpen) await this.connect(); }
  async list(): Promise<Task[]> { await this.ensureConnected(); const values = await this.client.hVals(HASH_KEY); return values.map(v => JSON.parse(v) as Task).sort((a,b) => b.createdAt.localeCompare(a.createdAt)); }
  async get(id: string): Promise<Task | null> { await this.ensureConnected(); const value = await this.client.hGet(HASH_KEY,id); return value ? JSON.parse(value) as Task : null; }
  async set(task: Task): Promise<void> { await this.ensureConnected(); await this.client.hSet(HASH_KEY,task.id,JSON.stringify(task)); }
  async delete(id: string): Promise<boolean> { await this.ensureConnected(); return (await this.client.hDel(HASH_KEY,id)) > 0; }
  async clear(): Promise<void> { await this.ensureConnected(); await this.client.del(HASH_KEY); }
}
