import {
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_LOAD,
  GET_EMAIL,
} from '../actions/index';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  load: false,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_EMAIL:
    return {
      name: action.name,
      email: action.email,
    };
  case GET_TOKEN:
    return {
      ...state,
    };
  case GET_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload,
      load: action.load,
    };
  case GET_TOKEN_LOAD:
    return {
      ...state, load: true,
    };
  default:
    return state;
  }
};

export default user;
