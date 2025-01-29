import { DbClient } from "@/db/create-db-client";
import { NotFoundError } from '@/utils/errors';

export type GetUserDataArgs = {
    dbClient: DbClient;
    email: string;
}

export async function getUserData({dbClient, email}: GetUserDataArgs) {
    const record = await dbClient
    .selectFrom('users')
    .where('email', '=', email) 
    .selectAll()
    .executeTakeFirstOrThrow(() => new NotFoundError('User not found.'));

  return record;
}