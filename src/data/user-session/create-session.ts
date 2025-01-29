import { DbClient } from "@/db/create-db-client";
import { CreateSession } from "./schema";


export type CreateSessionDataArgs = {
    dbClient: DbClient;
    values: CreateSession
}

export async function CreateSessionData({dbClient, values}: CreateSessionDataArgs) {
    const createdRecord = await dbClient
        .insertInto('user_sessions')
        .values(values)
        .returningAll()
        .executeTakeFirstOrThrow();
    return createdRecord;
}