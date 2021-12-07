import { combineReducers } from 'redux';

import errors from './errors/errors';
import transactions from './transactions/transactions';
import auth from './auth/auth';
import users from './users/users';

export default combineReducers({
  errors,
  transactions,
  auth,
  users,
});
