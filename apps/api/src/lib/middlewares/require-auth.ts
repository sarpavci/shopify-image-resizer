import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req?.user || !req?.user?.accessToken) {
    return res.status(401).json({
      error: 'Authentication required',
    });
  }

  return next();
};
