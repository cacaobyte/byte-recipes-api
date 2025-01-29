import { db } from '@/db';

export async function getUserByEmail(email: string) {
  return db.selectFrom('user').selectAll().where('email', '=', email).executeTakeFirst();
}
