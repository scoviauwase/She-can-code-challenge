import { types } from '../../actions/types';
import { User } from '../../types';

const initialState: User = {
  isLoading: false,
  users: [],
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_RECEIVERS:
      return {
        ...state,
        users: action.payload.data,
        // message: action.payload.message,
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
