import passport from 'passport';
import { Express } from 'express';

export default (app: Express) => {
  app.get('/auth/shopify', (req, res, next) => {
    const shop = req.query?.shop as string;
    if (!shop) {
      return res.status(400).json({ error: 'Shop parameter is required' });
    }

    const opts = {
      scope: ['read_products', 'write_products', 'read_orders'],
      state: shop,
    };

    return passport.authenticate('shopify', opts, undefined)(req, res, next);
  });
};
