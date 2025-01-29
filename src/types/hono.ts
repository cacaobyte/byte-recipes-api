import { type DbClient } from '@/db/create-db-client';
import { type RouteConfig, type RouteHandler } from '@hono/zod-openapi';
import { type Session } from './auth';

type Bindings = {
  APP_PORT: number;
  STAGE: string;
  DB_URL: string;
  TEST_DB_URL: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
};

export type HonoEnv = {
  Bindings: Bindings;
  Variables: {
    session: Session | null;
    dbClient: DbClient;
  };
};

export type AppRouteHandler<TRouteConfig extends RouteConfig> = RouteHandler<TRouteConfig, HonoEnv>;
