import * as actionTypes from './actionTypes';

export const userLogin = (email) => (
  { type: actionTypes.USER_LOGIN, email }
);

export const accRequestRecipe = () => (
  { type: actionTypes.REQUEST_API }
);

export const accAddRecipeMeals = (meals) => (
  { type: actionTypes.ADD_RECIPE_MEALS, meals }
);

export const accAddRecipeDrinks = (drinks) => (
  { type: actionTypes.ADD_RECIPE_DRINKS, drinks }
);

export const accFailRecipe = (error) => (
  { type: actionTypes.FAIL_API, error }
);
