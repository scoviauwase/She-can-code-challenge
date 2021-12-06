import prisma from '../lib/prisma';
import { decode } from '../utils/jwt_functions';
import { getToken } from '../utils/get_token';

const withProtect = (handler) => {
  return async (req, res) => {
    try {
      const token = getToken(req.headers.authorization);
      const userExists = decode(token);
      const user = await prisma.user.findUnique({
        where: { email: userExists.email },
      });
      if (!userExists || !user) {
        return res.status(401).json({
          status: 'failed',
          error: 'Unauthorized',
          data: {},
        });
      }

      req.user = user;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({
        status: 'failed',
        error: 'Unauthorized',
        data: error,
      });
    }
  };
};

export default withProtect;
