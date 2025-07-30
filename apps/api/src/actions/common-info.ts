import { Express } from 'express';

export default (app: Express) => {
  app.get('/', (_, res) => {
    res.send({ message: 'Welcome to api!' });
  });
};
