import passport from 'passport';
import { Express } from 'express';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user as Express.User));

export default (app: Express) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
