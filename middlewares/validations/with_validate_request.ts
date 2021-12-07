import Joi from 'joi';

const withValidateTransaction = (handler) => {
  return async (req, res) => {
    const schema = Joi.object({
      receiver: Joi.number().required().messages({
        'number.base': 'Receiver must be a selected',
        'number.empty': 'Please select receiver',
        'any.required': 'Receiver is required',
      }),
      source: Joi.string().required().messages({
        'any.required': 'Source currency is required',
        'string.empty': 'Source currency can not be empty',
      }),
      target: Joi.string().required().messages({
        'any.required': 'Target currency is required',
        'string.empty': 'Target currency can not be empty',
      }),
      amount: Joi.number().required().messages({
        'number.base': 'Amount must be a number',
        'number.empty': 'Please fill the amount',
        'any.required': 'Amount is required',
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

export default withValidateTransaction;
