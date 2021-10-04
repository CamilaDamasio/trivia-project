import { GET_SETTINGS } from '../actions/index';

const INITIAL_STATE = {
  categories: '',
  dificult: '',
  type: '',
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_SETTINGS:
    return {
      categories: action.categories,
      dificult: action.dificult,
      type: action.typeValue,
    };
  default:
    return state;
  }
};

export default settings;
