import { Auth } from '../../types';
import { types } from '../../actions/types';

const initialState: Auth = {
  message: '',
  isLoading: false,
  user: null,
  token: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        user: action.payload.user,
        token: action.payload.token,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: null,
        token: '',
        message: '',
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
