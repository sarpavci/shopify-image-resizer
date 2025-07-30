import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const upload = multer();

  return upload.single('file')(req, res, next);
};
