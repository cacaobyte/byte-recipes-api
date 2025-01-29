import { DB, UserRoleType, users } from "./types";

/**
 * Utility type to override specific field types from database tables:
 * - DATE fields: converted to `Date | string` if not null else do `Date | string | null`
 * - JSON fields: specific type overrides
 * - DEFAULT fields: explicit type definition
 * @example
 * type SampleTable = {
 *   id: Generated<string>;
 *   name: string;
 *   created_at: Generated<Timestamp>;
 *   updated_at: Generated<Timestamp>;
 *   deleted_at: Timestamp | null;
 *   status: Generated<UserStatusType>;
 * };
 *
 * type OverrideSampleTable = Omit<OverrideCommonFields<SampleTable>, 'status'> & {
 *   status: UserStatusType;
 * };
 */

type OverrideCommonFields<TTable> = Omit<
    TTable,
    'created_at' | 'created_by' | 'updated_at' | 'updated_by' | 'disabled_at' | 'disabled_by'
> & {
    created_at?: string;
    created_by?: string | null;
    updated_at?: string | null;
    updated_by?: string | null;
    disabled_at?: string | null;
    disabled_by?: string | null;
}

type OverrideUsers = Omit<OverrideCommonFields<users>, 'role'> & {
    role: UserRoleType;
};

export type User = OverrideUsers;

export type UserSession = DB['user_sessions'];

export type KyselySchema = DB;