import { types } from '../types';

export const getErrors = (error: string) => {
  return {
    type: types.GET_ERRORS,
    payload: error,
  };
};

export const clearErrors = () => {
  return {
    type: types.CLEARS_ERRORS,
  };
};
