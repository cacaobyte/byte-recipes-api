import { ForbiddenError } from '@/utils/errors';
import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';

import { type Context } from 'hono';
import { type KyselySchema } from './schema';

export function createDbClient(c: Context) {
  if (c.env.STAGE === 'test') {
    throw new ForbiddenError(
      'createDbClient cannot be used in test environment use createTestDbClient instead.'
    );
  }

  const dbClient = new Kysely<KyselySchema>({
    dialect: new PostgresDialect({
      pool: new pg.Pool({
        connectionString: c.env.DB_URL,
        max: 50, // Set maximum <number> of client(s) in the pool
        connectionTimeoutMillis: 2000, // return an error after <number> second(s) if connection could not be established
        idleTimeoutMillis: 0, // close idle clients after <number> second(s)
      }),
    }),
  });

  return dbClient;
}

/**
 * This is a helper function to create a database client for testing purposes only.
 */
export function createTestDbClient(c: Context) {
  const dbClient = new Kysely<KyselySchema>({
    dialect: new PostgresDialect({
      pool: new pg.Pool({
        connectionString: c.env.TEST_DB_URL,
        max: 50, // Set maximum <number> of client(s) in the pool
        connectionTimeoutMillis: 2000, // return an error after <number> second(s) if connection could not be established
        idleTimeoutMillis: 0, // close idle clients after <number> second(s)
      }),
    }),
  });

  return dbClient;
}

export type DbClient = ReturnType<typeof createDbClient> | ReturnType<typeof createTestDbClient>;
