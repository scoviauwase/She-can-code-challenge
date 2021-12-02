import Joi from 'joi';

const withValidateLogin = (handler) => {
  return async (req, res) => {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email can not be empty',
      }),
      password: Joi.string().required().messages({
        'any.required': 'Password is required',
        'string.empty': 'Password can not be empty',
      }),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({
        status: 'failed',
        error: error.details[0].message,
        data: error,
      });
    return handler(req, res);
  };
};

export default withValidateLogin;
