import { types } from '../../actions/types';
import { Transaction } from '../../types';

const initialState: Transaction = {
  isLoading: false,
  transactions: [],
  message: '',
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        isLoading: false,
        success: false,
        message: '',
      };
    case types.CREATE_TRANSACTION:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        success: true,
      };
    case types.IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ERRORS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
