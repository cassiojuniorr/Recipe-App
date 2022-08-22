import * as actionTypes from './actionTypes';

export const userLogin = (email) => (
  { type: actionTypes.USER_LOGIN, email }
);

export const accRequestRecipe = () => (
  { type: actionTypes.REQUEST_API }
);

export const accAddRecipe = (recipe) => (
  { type: actionTypes.ADD_RECIPE, recipe }
);

export const accFailRecipe = (error) => (
  { type: actionTypes.FAIL_API, error }
);
