import path from 'path';
import express, { Express } from 'express';

export default (app: Express) => {
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
};
