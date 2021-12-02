import Joi from 'joi';

const withValidateSignup = (handler) => {
  return async (req, res) => {
    const schema = Joi.object({
      name: Joi.string().required().messages({
        'any.required': 'Name is required',
        'string.empty': 'Name can not be empty',
      }),
      email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email can not be empty',
      }),
      password: Joi.string()
        .regex(
          new RegExp(
            '^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=])(?=.*?[0-9]).*$',
          ),
        )
        .required()
        .messages({
          'any.required': 'Password is required',
          'string.pattern.base':
            'Password must be at least 8 characters including 1 uppercase and special character',
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

export default withValidateSignup;
