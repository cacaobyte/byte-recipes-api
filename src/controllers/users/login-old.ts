import { authenticateUser } from '@/services/auth/authenticate-user';
import { type AppRouteHandler } from '@/types/hono';
import { z } from '@hono/zod-openapi';
import { createRoute } from '@hono/zod-openapi';

export const loginSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
};

export const loginRoute = createRoute({
  middleware: [],
  security: [{ bearerAuth: [] }],
  method: 'post',
  path: '/auth/login',
  tags: ['auth'],
  summary: 'User login',
  description: 'Authenticate a user and return tokens',
  request: { body: { content: { 'application/json': { schema: loginSchema.body } } } },
  responses: {
    200: {
      description: 'Login successful',
    },
    401: {
      description: 'Invalid credentials',
    },
  },
});

export const loginRouteHandler: AppRouteHandler<typeof loginRoute> = async c => {
  const { email, password } = c.req.valid('json');
  const tokens = await authenticateUser({ email, password });
  return c.json(tokens);
};
