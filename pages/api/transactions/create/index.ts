import { NextApiResponse } from 'next';

import withProtect from '../../../../middlewares/with_protect';
import withValidateTransaction from '../../../../middlewares/validations/with_validate_request';
import prisma from '../../../../lib/prisma';

const createTransaction = async (req, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.user;
  const { receiver, source, target, amount } = req.body;

  let senderUsdBalance;
  let senderNgnBalance;
  let senderEurBalanace;
  let receiverUsdBalance;
  let receiverNgnBalance;
  let receiverEurBalanace;
  let rate;

  if (method === 'POST') {
    try {
      const findReceiver = await prisma.user.findUnique({
        where: { id: receiver },
      });

      if (!findReceiver) {
        return res.status(400).json({
          status: 'failed',
          error: 'receiver is not registered',
          data: {},
        });
      }
      // sender transaction info
      const senderReceivedTransactions = await prisma.transaction.findMany({
        where: { receiverId: id },
        include: { receiver: true },
        orderBy: { createdAt: 'desc' },
      });

      const senderSentTransactions = await prisma.transaction.findMany({
        where: { senderId: id },
        include: { sender: true },
        orderBy: { createdAt: 'desc' },
      });

      if (
        (senderReceivedTransactions.length &&
          senderSentTransactions.length &&
          senderReceivedTransactions[0].createdAt >
            senderSentTransactions[0].createdAt) ||
        (senderReceivedTransactions.length && !senderSentTransactions.length)
      ) {
        senderUsdBalance = senderReceivedTransactions[0].usdBalance;
        senderNgnBalance = senderReceivedTransactions[0].ngnBalance;
        senderEurBalanace = senderReceivedTransactions[0].eurBalance;
      } else if (
        (senderReceivedTransactions.length &&
          senderReceivedTransactions.length &&
          senderReceivedTransactions[0].createdAt <
            senderSentTransactions[0].createdAt) ||
        (!senderReceivedTransactions.length && senderSentTransactions.length)
      ) {
        senderUsdBalance = senderSentTransactions[0].usdBalance;
        senderNgnBalance = senderSentTransactions[0].ngnBalance;
        senderEurBalanace = senderSentTransactions[0].eurBalance;
      }
      // receiver transaction info
      const ReceiverReceivedTransactions = await prisma.transaction.findMany({
        where: { receiverId: receiver },
        include: { receiver: true },
        orderBy: { createdAt: 'desc' },
      });

      const ReceiverSentTransactions = await prisma.transaction.findMany({
        where: { senderId: receiver },
        include: { sender: true },
        orderBy: { createdAt: 'desc' },
      });

      if (
        (ReceiverReceivedTransactions.length &&
          ReceiverSentTransactions.length &&
          ReceiverReceivedTransactions[0].createdAt >
            ReceiverSentTransactions[0].createdAt) ||
        (ReceiverReceivedTransactions.length &&
          !ReceiverSentTransactions.length)
      ) {
        receiverUsdBalance = ReceiverReceivedTransactions[0].usdBalance;
        receiverNgnBalance = ReceiverReceivedTransactions[0].ngnBalance;
        receiverEurBalanace = ReceiverReceivedTransactions[0].eurBalance;
      } else if (
        (ReceiverReceivedTransactions.length &&
          ReceiverSentTransactions.length &&
          ReceiverReceivedTransactions[0].createdAt <
            ReceiverSentTransactions[0].createdAt) ||
        (!ReceiverReceivedTransactions.length &&
          ReceiverSentTransactions.length)
      ) {
        receiverUsdBalance = ReceiverSentTransactions[0].usdBalance;
        receiverNgnBalance = ReceiverSentTransactions[0].ngnBalance;
        receiverEurBalanace = ReceiverSentTransactions[0].eurBalance;
      }

      if (source === target && source === 'USD') {
        senderUsdBalance = Number(`${senderUsdBalance}`) - amount;
        receiverUsdBalance = Number(`${receiverUsdBalance}`) + amount;
        rate = 1;
      } else if (source === target && source === 'EUR') {
        senderEurBalanace = Number(`${senderUsdBalance}`) - amount;
        receiverEurBalanace = Number(`${receiverUsdBalance}`) + amount;
        rate = 1;
      } else if (source === target && source === 'NGN') {
        senderNgnBalance = Number(`${senderUsdBalance}`) - amount;
        receiverNgnBalance = Number(`${receiverUsdBalance}`) + amount;
        rate = 1;
      } else if (source === 'USD' && target === 'EUR') {
        rate = 0.89;
        senderUsdBalance = Number(`${senderUsdBalance}`) - amount;
        receiverEurBalanace =
          receiverEurBalanace !== null
            ? Number(`${receiverEurBalanace}`) + amount * rate
            : 0 + amount * rate;
      } else if (source === 'USD' && target === 'NGN') {
        rate = 410;
        senderUsdBalance = Number(`${senderUsdBalance}`) - amount;
        receiverNgnBalance =
          receiverNgnBalance !== null
            ? Number(`${receiverNgnBalance}`) + amount * rate
            : 0 + amount * rate;
      } else if (source === 'EUR' && target === 'USD') {
        rate = 1.13;
        senderEurBalanace =
          senderEurBalanace !== null
            ? Number(`${senderEurBalanace}`) - amount
            : 0 - amount;
        receiverUsdBalance =
          receiverUsdBalance !== null
            ? Number(`${receiverUsdBalance}`) + amount * rate
            : 0 + amount * rate;
      } else if (source === 'EUR' && target === 'NGN') {
        rate = 462.87;
        senderEurBalanace =
          senderEurBalanace !== null
            ? Number(`${senderEurBalanace}`) - amount
            : 0 - amount;
        receiverNgnBalance =
          receiverNgnBalance !== null
            ? Number(`${receiverNgnBalance}`) + amount * rate
            : 0 + amount * rate;
      } else if (source === 'NGN' && target === 'USD') {
        rate = 0.0024;
        senderNgnBalance =
          senderNgnBalance !== null
            ? Number(`${senderNgnBalance}`) - amount
            : 0 - amount;
        receiverUsdBalance =
          receiverUsdBalance !== null
            ? Number(`${receiverUsdBalance}`) + amount * rate
            : 0 + amount * rate;
      } else if (source === 'NGN' && target === 'EUR') {
        rate = 0.0021;
        senderNgnBalance =
          senderNgnBalance !== null
            ? Number(`${senderNgnBalance}`) - amount
            : 0 - amount;
        receiverEurBalanace =
          receiverEurBalanace !== null
            ? Number(`${receiverEurBalanace}`) + amount * rate
            : 0 + amount * rate;
      }

      const newTransaction = await prisma.transaction.create({
        data: {
          senderId: id,
          receiverId: receiver,
          sourceCurrency: source,
          targetCurrency: target,
          usdBalance: receiverUsdBalance,
          eurBalance: receiverEurBalanace,
          ngnBalance: receiverNgnBalance,
          exchangeRate: rate,
          amount: amount,
        },
      });

      res.status(200).json({
        status: 'success',
        message: 'Transaction created successfully',
        data: newTransaction,
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

export default withProtect(withValidateTransaction(createTransaction));
