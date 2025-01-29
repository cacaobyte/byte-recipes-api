import { createDbClient } from '@/db/create-db-client';
import { type Context, type Next } from 'hono';

export async function setUpDbClientMiddleware(c: Context, next: Next) {
  const dbClient = createDbClient(c);

  try {
    // Almacenamos el cliente en el contexto.
    c.set('dbClient', dbClient);

    await next(); // Procesamos la solicitud.
  }
  catch(err) {
    // Si hay un error, lo lanzamos.
    throw err;
  }
  finally {
    // Cerramos el cliente para evitar fugas de conexiones.
    await dbClient.destroy();
  }
}
