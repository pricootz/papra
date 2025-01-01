import { createMiddleware } from 'hono/factory';
import type { Config } from '../../config/config.types';

export function createConfigMiddleware({ config }: { config: Config } ) {
  return createMiddleware(async (context, next) => {
      context.set('config', config);
      return next();

  });
}
