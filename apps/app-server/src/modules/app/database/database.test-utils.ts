import type { Database } from './database.types';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { apiKeysTable } from '../../api-keys/api-keys.db';
import { communicationsTable } from '../../communications/communications.db';
import { renderingsTable } from '../../renderings/renderings.db';
import { usersTable } from '../../users/users.db';
import { setupDatabase } from './database';

export { createInMemoryDatabase, seedDatabase };

async function createInMemoryDatabase(seedOptions: Omit<Parameters<typeof seedDatabase>[0], 'db'> | undefined = {}) {
  const { db } = setupDatabase({ url: ':memory:' });

  await migrate(db, { migrationsFolder: './migrations' });

  await seedDatabase({ db, ...seedOptions });

  return {
    db,
  };
}

async function seedDatabase({
  db,
  users,
  renderings,
  apiKeys,
  communications,
}: {
  db: Database;
  users?: typeof usersTable.$inferInsert[];
  renderings?: typeof renderingsTable.$inferInsert[];
  apiKeys?: typeof apiKeysTable.$inferInsert[];
  communications?: typeof communicationsTable.$inferInsert[];
}) {
  await Promise.all([
    users && db.insert(usersTable).values(users).execute(),
    renderings && db.insert(renderingsTable).values(renderings).execute(),
    apiKeys && db.insert(apiKeysTable).values(apiKeys).execute(),
    communications && db.insert(communicationsTable).values(communications).execute(),
  ]);
}
