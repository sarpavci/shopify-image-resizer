import { Express } from 'express';

import requireAuth from '../lib/middlewares/require-auth';

export default (app: Express) => {
  app.get('/auth/me', requireAuth, (req, res) => {
    const user = {
      id: req?.user?.id,
      username: req?.user?.username,
      storeDomain: req?.user?.storeDomain,
      displayName: req?.user?.displayName,
    };

    return res.json({ user });
  });
};
