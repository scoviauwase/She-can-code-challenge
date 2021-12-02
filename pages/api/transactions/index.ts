import { NextApiResponse } from 'next';

import withProtect from '../../../middlewares/with_protect';
import prisma from '../../../lib/prisma';

const getAllTransactions = async (req, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.user;

  if (method === 'GET') {
    try {
      const receivedTransactions = await prisma.transaction.findMany({
        where: { receiverId: id },
        include: { receiver: true },
      });

      const sentTransactions = await prisma.transaction.findMany({
        where: { senderId: id },
        include: { sender: true },
      });

      res.status(200).json({
        status: 'success',
        message: 'Transactions retrieved successfully',
        data: {
          transactions: [...receivedTransactions, ...sentTransactions],
          receivedTransactions,
          sentTransactions,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: 'transactions not retrieved',
        data: error,
      });
    }
  }
};

export default withProtect(getAllTransactions);
