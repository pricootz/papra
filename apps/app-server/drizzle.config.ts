import { defineConfig } from 'drizzle-kit';
import { env } from 'node:process';

export default defineConfig({
  schema: ['./src/modules/**/*.table.ts'],
  dialect: 'turso',
  out: './migrations',
  dbCredentials: {
    url: String(env.DATABASE_URL),
    authToken: env.DATABASE_AUTH_TOKEN,
  },
});
