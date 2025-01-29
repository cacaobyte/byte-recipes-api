import { type User } from '@/db/schema';
import { UserRoleType } from '@/db/types';
import { z } from '@hono/zod-openapi';

export const userSchemaObject = {
    id_user: z.string().uuid(),
    email: z.string().email().openapi({
        example: "user@mail.com"
    }),
    password: z.string().min(8).max(255).openapi({
        example: "a1b2c3d4e5f6g7h8"
    }),
    name: z.string().max(255).openapi({
        example: "User Name"
    }),
    is_active: z.boolean().openapi({
        example: true
    }),
    created_at: z.union([z.coerce.date(), z.string()]).openapi({
        example: new Date().toISOString()
    }),
    created_by: z.string().uuid().nullable().optional().openapi({
        example: null
    }),
    updated_at: z.union([z.coerce.date(), z.string()]).nullable().optional().openapi({
        example: null
    }),
    updated_by: z.string().uuid().nullable().optional().openapi({
        example: null
    }),
    disabled_at: z.union([z.coerce.date(), z.string()]).nullable().optional().openapi({
        example: null
    }),
    disabled_by: z.string().uuid().nullable().optional().openapi({
        example: null
    }),
    role: z.nativeEnum(UserRoleType).openapi({
        example: UserRoleType.USER,
    }),
}

export const userSchema = z.object(userSchemaObject) satisfies z.ZodType<User>;
export const userSchemaOpenApi = userSchema.openapi('User');
export const userSchemaFields = z.enum(Object.keys(userSchemaObject) as [string, ...string[]]);

export type CreateUser = Omit<User, 'id_user' | 'created_at' | 'updated_at' | 'disabled_at' | 'created_by' | 'updated_by' | 'disabled_by'>;