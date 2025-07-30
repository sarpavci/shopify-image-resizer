import { Express } from 'express';

import { MockStore } from '../lib/utils/mock-store';

import requireAuth from '../lib/middlewares/require-auth';

export default (app: Express) => {
  app.get('/image/resize-history', requireAuth, (req, res) => {
    const imageId = req.query.imageId as string;

    if (!imageId) {
      return res.status(404).json({ message: 'No image id found.' });
    }

    return res.json({ history: MockStore.getByImageId(imageId) });
  });
};
