import { Express } from 'express';
import session from 'express-session';

export default (app: Express) =>
  app.use(
    session({
      resave: false,
      cookie: { secure: false },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
    })
  );
