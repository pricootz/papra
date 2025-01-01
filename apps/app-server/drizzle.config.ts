import { env } from 'node:process';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: ['./src/modules/**/*.table.ts'],
  dialect: 'turso',
  out: './migrations',
  dbCredentials: {
    url: String(env.DATABASE_URL),
    authToken: env.DATABASE_AUTH_TOKEN,
  },
});
