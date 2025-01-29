// import { UserSession } from '@/db/schema';
import { UserSession } from '@/db/schema';
import { z } from '@hono/zod-openapi';

export const userSessionSchemaObject = {
    id_sessions: z.string().uuid().optional(),
    user_id: z.string().uuid(),
    access_token: z.string().max(255).openapi({
        example: "a1b2c3d4e5f6g7h8"
    }),
    refresh_token: z.string().max(255).openapi({
        example: "a1b2c3d4e5f6g7h8"
    }),
    expires_at: z.union([z.coerce.date(), z.string()]).openapi({
        example: new Date().toISOString()
    }),
    is_active: z.boolean().openapi({
        example: true
    }),
    device_id: z.string().max(255).nullable().optional().openapi({
        example: 'a1b2c3d4e5f6g7h8'
    }),
    device_name: z.string().max(255).nullable().optional().openapi({
        example: 'Device Name'
    }),
    device_type: z.string().max(255).nullable().optional().openapi({
        example: 'ios'
    }),
    device_os: z.string().max(255).nullable().optional().openapi({
        example: '16.2'
    }),
    device_ip: z.string().max(255).nullable().optional().openapi({
        example: '92.168.32.44'
    }),
    device_location: z.string().max(255).nullable().optional().openapi({
        example: 'Guatemala'
    }),
    created_at: z.union([z.coerce.date(), z.string()]).optional().openapi({
        example: new Date().toISOString()
    }),
    updated_at: z.union([z.coerce.date(), z.string()]).nullable().optional().openapi({
        example: null
    }),
    disabled_at: z.union([z.coerce.date(), z.string()]).nullable().optional().openapi({
        example: null
    }),
}

export type CreateSession = Omit<UserSession, 'id_sessions' | 'created_at' | 'updated_at' | 'disabled_at' | 'is_active' | 'device_id' | 'device_name' | 'device_type' | 'device_os' | 'device_ip' | 'device_location'>
