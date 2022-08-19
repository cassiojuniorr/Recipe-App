import * as actionTypes from './actionTypes';

export const userLogin = (email) => (
  { type: actionTypes.USER_LOGIN, email }
);

// asdasd

export const addScore = (score) => (
  { type: actionTypes.ADD_SCORE, score }
);

// export const addAssertions = () => ({
//   type: actionTypes.ADD_ASSERTIONS,
// });
