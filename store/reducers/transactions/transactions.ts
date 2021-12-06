import { types } from '../../actions/types';
import { Transaction } from '../../types';

const initialState: Transaction = {
  isLoading: false,
  transactions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        isLoading: false,
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
