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

export const accAddCategoryMeals = (categories) => (
  { type: actionTypes.ADD_CATEGORY_MEALS, categories }
);

export const accAddCategoryDrinks = (categories) => (
  { type: actionTypes.ADD_CATEGORY_DRINKS, categories }
);

export const accFailRecipe = (error) => (
  { type: actionTypes.FAIL_API, error }
);
