import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { encode } from '../../../../utils/jwt_functions';
import prisma from '../../../../lib/prisma';
import withValidateLogin from '../../../../middlewares/validations/with_validate_login';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      const checkUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      const checkPassword = await bcrypt.compareSync(
        password,
        checkUser.password,
      );

      if (!checkUser || !checkPassword) {
        return res.status(401).json({
          status: 'failed',
          error: 'Unauthorized',
          data: {},
        });
      }

      const token = encode(checkUser);

      delete checkUser.password;

      res.status(200).json({
        status: 'ok',
        message: 'Logged In successfully',
        token,
        data: checkUser,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: 'User not logged in',
        data: error,
      });
    }
  }
};

export default withValidateLogin(login);
