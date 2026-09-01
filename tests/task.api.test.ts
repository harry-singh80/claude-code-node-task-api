import request from 'supertest';
import { createApp } from '../src/app';
import { InMemoryTaskStorage } from '../src/storage/in-memory-task-storage';

describe('Task API',() => {
  const storage = new InMemoryTaskStorage();
  const app = createApp(storage);
  beforeEach(async () => { await storage.clear(); });
  it('returns health status',async () => { const r=await request(app).get('/health'); expect(r.status).toBe(200); expect(r.body.success).toBe(true); });
  it('creates a task',async () => { const r=await request(app).post('/api/tasks').send({title:'Learn Claude Code',description:'Use it with a Node.js project'}); expect(r.status).toBe(201); expect(r.body.data.title).toBe('Learn Claude Code'); expect(r.body.data.completed).toBe(false); expect(r.body.data.id).toBeDefined(); });
  it('validates task title',async () => { const r=await request(app).post('/api/tasks').send({title:''}); expect(r.status).toBe(400); expect(r.body.error.message).toBe('Validation failed'); });
  it('lists, gets, updates and deletes a task',async () => {
    const created=await request(app).post('/api/tasks').send({title:'Initial title'}); const id=created.body.data.id;
    expect((await request(app).get('/api/tasks')).body.data).toHaveLength(1);
    expect((await request(app).get(`/api/tasks/${id}`)).body.data.id).toBe(id);
    const update=await request(app).put(`/api/tasks/${id}`).send({completed:true,title:'Updated title'}); expect(update.body.data.completed).toBe(true);
    expect((await request(app).delete(`/api/tasks/${id}`)).status).toBe(204);
    expect((await request(app).get(`/api/tasks/${id}`)).status).toBe(404);
  });
  it('returns 404 for an unknown route',async () => { expect((await request(app).get('/api/unknown')).status).toBe(404); });
});
