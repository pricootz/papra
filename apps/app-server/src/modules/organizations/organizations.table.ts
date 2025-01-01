import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createPrimaryKeyField, createTimestampColumns } from '../shared/db/columns.helpers';
import { usersTable } from '../users/users.table';

export const organizationTable = sqliteTable('organizations', {
  ...createPrimaryKeyField({ prefix: 'org' }),
  ...createTimestampColumns(),

  name: text('name').notNull(),
});

export const organizationUserTable = sqliteTable('organization_users', {
  ...createPrimaryKeyField({ prefix: 'org_usr' }),
  ...createTimestampColumns(),

  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade', onUpdate: 'cascade' }),

  organizationId: text('organization_id')
    .notNull()
    .references(() => organizationTable.id, { onDelete: 'cascade', onUpdate: 'cascade' }),

  roleId: text('role_id')
    .notNull()
    .default('member')
});
