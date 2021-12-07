import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma';
import withProtect from '../../../middlewares/with_protect';

const getReceivers = async (req: any, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.user;

  if (method === 'GET') {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json({
        status: 'success',
        message: 'Users retrieved successfully',
        data: users.filter((user) => user.id !== id),
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: 'users not retrieved',
        data: error,
      });
    }
  }
};

export default withProtect(getReceivers);
