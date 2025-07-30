import { Express } from 'express';

import requireAuth from '../lib/middlewares/require-auth';

export default (app: Express) => {
  app.post('/auth/logout', requireAuth, (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }

      return res.json({ message: 'Logged out successfully' });
    });
  });
};
