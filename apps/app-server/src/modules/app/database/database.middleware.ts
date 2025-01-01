import { createMiddleware } from 'hono/factory';
import type { ServerInstanceGenerics } from '../server.types';
import type { Database } from './database.types';

export function createDatabaseMiddleware({ db }: { db: Database } ) {
  return createMiddleware<ServerInstanceGenerics>(async (context, next) => {
      context.set('db', db);

    await next();
  });
}
