import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

/* ----------------- User Schema ----------------- */
export const UserRoleType = {
    SUPER_ADMIN: "SUPER_ADMIN",
    ADMIN: "ADMIN",
    USER: "USER"
} as const;

export type UserRoleType = (typeof UserRoleType)[keyof typeof UserRoleType];

export type users = {
    id_user: Generated<string>;
    email: string;
    password: string;
    name: string;
    is_active: boolean;
    created_at: Generated<Timestamp>;
    created_by: string | null;
    updated_at: Generated<Timestamp>;
    updated_by: string | null;
    disabled_at: Timestamp | null;
    disabled_by: string | null;
    role: Generated<UserRoleType>;
}

/* ----------------- Product Schema ----------------- */
export type products = {
    id: Generated<string>;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
    deleted_at: Timestamp | null;
    name: string;
    description: string | null;
    price: number;
};

export type user_sessions = {
    id_sessions: Generated<string>;
    user_id: string;
    access_token: string;
    refresh_token: string;
    expires_at: Generated<Timestamp>;
    is_active: boolean;
    device_id: string | null;
    device_name: string | null;
    device_type: string | null;
    device_os: string | null;
    device_ip: string | null;
    device_location: string | null;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp | null;
    disabled_at: Timestamp | null;
}

export type DB = {
    products: products;
    users: users;
    user_sessions: user_sessions;
};