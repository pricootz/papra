import type { ServerInstance } from './server.types';


export function registerRoutes({ app }: { app: ServerInstance }) {
  registerPublicRoutes({ app });
  registerPrivateRoutes({ app });
}

function registerPublicRoutes({ app }: { app: ServerInstance }) {
  app.get('/api/ping', context => context.json({ status: 'ok' }));

 
}

function registerPrivateRoutes({ app }: { app: ServerInstance }) {

}
