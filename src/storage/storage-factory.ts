import { InMemoryTaskStorage } from './in-memory-task-storage';
import { RedisTaskStorage } from './redis-task-storage';
import { TaskStorage } from './task-storage';

export async function createTaskStorage(): Promise<TaskStorage> {
  const redisUrl = process.env.REDIS_URL?.trim();
  if (!redisUrl) { console.log('Storage: in-memory Map'); return new InMemoryTaskStorage(); }
  try {
    const redisStorage = new RedisTaskStorage(redisUrl);
    await redisStorage.connect();
    console.log('Storage: Redis');
    return redisStorage;
  } catch {
    console.warn('Redis unavailable. Falling back to in-memory storage.');
    return new InMemoryTaskStorage();
  }
}
