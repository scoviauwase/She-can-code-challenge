import axios from 'axios';

import { types } from '../types';
import { getErrors, clearErrors } from '../errors/errors';

export const getAllTransactions = () => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(isLoading());
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get('/api/transactions/getusers', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: types.GET_USERS_TRANSACTIONS,
      payload: res.data.data.transactions,
    });
  } catch (error) {
    dispatch(clearErrors());
    dispatch(
      getErrors(
        `${error ? error.response.data.error : 'Something went wrong'}`,
      ),
    );
  }
};

export const createTransaction = (values) => async (dispatch) => {
  const { receiver, source, target, amount } = values;
  dispatch(clearErrors());
  dispatch(isLoading());
  const token = localStorage.getItem('token');
  try {
    const res = await axios.post(
      '/api/transactions/create',
      {
        receiver: Number(receiver),
        source,
        target,
        amount: Number(amount),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    dispatch({
      type: types.CREATE_TRANSACTION,
      payload: res.data,
    });
  } catch (error) {
    dispatch(clearErrors());
    dispatch(
      getErrors(
        `${error ? error.response.data.error : 'Something went wrong'}`,
      ),
    );
  }
};

export const isLoading = () => {
  clearErrors();
  return {
    type: types.IS_LOADING,
  };
};
