import axios from 'axios';

import { types } from '../types';
import { clearErrors, getErrors } from '../errors/errors';
import { isLoading } from '../transactions/transactions';
import { AuthState } from '../../../pages/auth';

export const authenicateUser = (values, authState) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(isLoading());
  const { name, email, password } = values;
  try {
    let res;
    if (authState === AuthState.signup) {
      res = await axios.post('/api/auth/signup', { name, email, password });
    } else if (authState === AuthState.login) {
      res = await axios.post('/api/auth/login', { email, password });
    }
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', res.data.data.name);
    localStorage.setItem('id', res.data.data.id);
    dispatch({
      type: types.AUTH_SUCCESS,
      payload: {
        token: res.data.token,
        user: res.data.data.name,
        message: res.data.message,
        id: res.data.data.id,
      },
    });
  } catch (error) {
    dispatch(clearErrors());
    dispatch(
      getErrors(
        `${error ? error.response.data.error : 'Something went wrong'}`,
      ),
    ); // return errors from the server or dummy error
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return {
    type: types.LOGOUT_SUCCESS,
  };
};
