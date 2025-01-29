import { createUser } from '@/data/auth/create-user';
import { type AppRouteHandler } from '@/types/hono';
import { z } from '@hono/zod-openapi';
import { createRoute } from '@hono/zod-openapi';

export const signupSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1),
  }),
};

export const createUserRoute = createRoute({
  path: '/auth/signup',
  method: 'post',
  summary: 'User signup',
  request: { body: signupSchema.body },
  responses: {
    201: {
      description: 'User registered successfully',
    },
  },
});

export const createUserRouteHandler: AppRouteHandler<typeof createUserRoute> = async c => {
  const { email, password, name } = c.req.valid('body');
  await createUser({ email, password, name });
  return c.json({ message: 'User registered successfully' }, 201);
};
