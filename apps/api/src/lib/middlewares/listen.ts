import { Express } from 'express';

export default (app: Express) => {
  const port = process.env.PORT || 5000;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });

  server.on('error', console.error);
};
