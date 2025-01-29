import { type DbClient } from "@/db/create-db-client"
import { CreateUser } from "./schema";

export type CreateUserDataArgs = {
    dbClient: DbClient;
    values: CreateUser;
}

export async function CreateUserData({dbClient, values}: CreateUserDataArgs) {
    const createdRecord = await dbClient
        .insertInto('users')
        .values(values)
        .returningAll()
        .executeTakeFirstOrThrow();
    return createdRecord;
}