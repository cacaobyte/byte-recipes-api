import { refreshAccessToken } from '@/services/auth/refresh-token';
import { type AppRouteHandler } from '@/types/hono';
import { z } from '@hono/zod-openapi';
import { createRoute } from '@hono/zod-openapi';

export const refreshTokenSchema = {
  body: z.object({
    refresh_token: z.string(),
  }),
};

export const refreshTokenRoute = createRoute({
  path: '/auth/refresh-token',
  method: 'post',
  summary: 'Refresh access token',
  request: { body: refreshTokenSchema.body },
  responses: {
    200: {
      description: 'Token refreshed successfully',
    },
    401: {
      description: 'Invalid refresh token',
    },
  },
});

export const refreshTokenRouteHandler: AppRouteHandler<typeof refreshTokenRoute> = async c => {
  const { refresh_token } = c.req.valid('body');
  const tokens = await refreshAccessToken({ refreshToken: refresh_token });
  return c.json(tokens);
};
