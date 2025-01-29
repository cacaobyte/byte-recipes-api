import { hashPassword } from '@/utils/hash';
import { db } from '@/db';

export async function createUser({ email, password, name }: { email: string; password: string; name: string }) {
  const hashedPassword = await hashPassword(password);
  await db.insertInto('user').values({ email, password: hashedPassword, name }).execute();
}
