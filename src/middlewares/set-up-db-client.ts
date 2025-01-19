import { createDbClient } from '@/db/create-db-client';
import { type Context, type Next } from 'hono';

let dbClient: ReturnType<typeof createDbClient> | null = null;

export async function setUpDbClientMiddleware(c: Context, next: Next) {
  if (!dbClient) {
    dbClient = createDbClient(c);
  }

  c.set('dbClient', dbClient);

  await next();
}
