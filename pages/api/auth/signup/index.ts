import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { encode } from '../../../../utils/jwt_functions';
import prisma from '../../../../lib/prisma';
import withValidateSignup from '../../../../middlewares/validations/with_validate_signup';

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { name, email, password } = req.body;

      const checkUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (checkUser) {
        return res.status(400).json({
          status: 'failed',
          error: 'User already exists',
          data: {},
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
        },
      });

      await prisma.transaction.create({
        data: { receiverId: user.id, usdBalance: 1000, amount: 1000 },
      });
      const token = encode(user);

      delete user.password;

      res.status(200).json({
        status: 'ok',
        message: 'User successfully created',
        token,
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: 'user not created',
        data: error,
      });
    }
  }
};
export default withValidateSignup(signup);
