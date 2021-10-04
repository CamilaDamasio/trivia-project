import { GET_SCORE } from '../actions/index';

const INITIAL_STATE = {
  score: 0,
  asserts: 0,
};

const score = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_SCORE:
    return {
      score: action.score,
      asserts: action.asserts,
    };
  default:
    return state;
  }
};

export default score;
