import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { version } from '../package.json';
import { routes } from './controllers/routes';
import { setUpDbClientMiddleware } from './middlewares/set-up-db-client';
import { HonoEnv } from './types/hono';
import { Context } from 'hono';

const app = new OpenAPIHono<HonoEnv>();

/* API Docs */
app.doc('/openapi.json', c => ({
  openapi: '3.0.0',
  info: {
    version,
    title: `${c.env.STAGE.toUpperCase()} API`,
    description: 'API Documentation',
  },
  externalDocs: {
    description: 'API Reference',
    url: '/reference',
  },
}));
app.get('/swagger', swaggerUI({ url: '/openapi.json' }));
app.get('/reference', apiReference({ spec: { url: '/openapi.json' } }));

/* Security Schemes */
app.openAPIRegistry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

/* Global Middlewares */
app.use(setUpDbClientMiddleware);

/* Routes */
routes.forEach(route => {
  app.route('/', route);
});

app.get('/', (c: Context)=> {
  return c.json({ message: 'API Byte Recipes v1' });
})

app.notFound(c => {
  return c.json({ message: 'Not Found' }, 404);
});

export default app;
