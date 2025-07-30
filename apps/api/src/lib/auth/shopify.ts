import passport from 'passport';
import { Strategy } from 'passport-shopify';

import { getUserFromProfile } from '../utils/auth';

export default () =>
  passport.use(
    'shopify',
    new Strategy(
      {
        shop: process.env.SHOPIFY_SHOP_SLUG as string,
        clientID: process.env.SHOPIFY_CLIENT_ID as string,
        clientSecret: process.env.SHOPIFY_CLIENT_SECRET as string,
        callbackURL: process.env.SHOPIFY_CALLBACK_URL as string,
        scope: ['read_products', 'write_products', 'read_orders'],
      },
      async (accessToken, refreshToken, profile, done) => {
        const user = {
          ...getUserFromProfile(profile),
          accessToken: accessToken,
          refreshToken: refreshToken,
        };

        return done(undefined, user);
      }
    )
  );
