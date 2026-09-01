import 'dotenv/config';
import { createApp } from './app';
import { createTaskStorage } from './storage/storage-factory';

async function bootstrap(): Promise<void> {
  const port = Number(process.env.PORT ?? 3000);
  const storage = await createTaskStorage();
  const app = createApp(storage);
  app.listen(port,() => console.log(`Task API running on http://localhost:${port}`));
}
bootstrap().catch((error) => { console.error('Failed to start application:',error); process.exit(1); });
