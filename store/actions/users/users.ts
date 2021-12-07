import axios from 'axios';

import { types } from '../types';
import { getErrors, clearErrors } from '../errors/errors';
import { isLoading } from '../transactions/transactions';

export const getUsers = () => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(isLoading());
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: types.GET_ALL_RECEIVERS,
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
