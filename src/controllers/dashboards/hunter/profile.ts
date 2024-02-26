import { Request, Response } from 'express';

export const profile = (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
