import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actionTypes.USER_LOGIN:
    return ({
      ...state,
      email: action.email,
    });
  // case actionTypes.ADD_SCORE:
  //   return ({
  //     ...state,
  //     score: state.score + action.score,
  //   });
  // case actionTypes.ADD_ASSERTIONS:
  //   return ({
  //     ...state,
  //     assertions: state.assertions + 1,
  //   });
  default:
    return state;
  }
};

export default user;
