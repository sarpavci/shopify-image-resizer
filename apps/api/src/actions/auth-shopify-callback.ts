import passport from 'passport';
import { Express } from 'express';

export default (app: Express) => {
  app.get(
    '/auth/shopify/callback',
    passport.authenticate('shopify', { failureRedirect: '/login' }, undefined),
    (req, res) => {
      const shop = req.query?.shop as string;
      if (!shop) {
        res.status(401).send({
          message: 'Unauthorized',
          detail: 'Shop should be provided!',
        });
      }

      const accessToken = req.user?.accessToken as string;
      if (!accessToken) {
        res.status(401).send({
          message: 'Unauthorized',
          detail: 'Access token not found!',
        });
      }

      res.redirect(process.env.CLIENT_REDIRECT_URL as string);
    }
  );
};
