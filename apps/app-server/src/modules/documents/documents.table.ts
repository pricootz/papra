import { numeric, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { organizationTable } from '../organizations/organizations.table';
import { createPrimaryKeyField, createSoftDeleteColumns, createTimestampColumns } from '../shared/db/columns.helpers';
import { usersTable } from '../users/users.table';

export const documentsTable = sqliteTable('documents', {
  ...createPrimaryKeyField({ prefix: 'usr' }),
  ...createTimestampColumns(),
  ...createSoftDeleteColumns(),

  organizationId: text('organization_id').notNull().references(() => organizationTable.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  createdBy: text('created_by').references(() => usersTable.id, { onDelete: 'set null', onUpdate: 'cascade' }),
  deletedBy: text('deleted_by').references(() => usersTable.id, { onDelete: 'set null', onUpdate: 'cascade' }),

  originalName: text('original_name').notNull(),
  originalChecksum: text('original_checksum').notNull(),
  originalSize: numeric('original_size').notNull().default('0'),
  name: text('name').notNull(),
  mimeType: text('mime_type').notNull(),
  size: numeric('size').notNull().default('0'),
  status: text('status').notNull().default('pending'),
});
