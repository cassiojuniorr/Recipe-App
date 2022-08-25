import {
  accRequestRecipe,
  accAddRecipeMeals,
  accAddRecipeDrinks,
  accAddCategoryMeals,
  accAddCategoryDrinks,
  accFailRecipe,
} from '../redux/actions/index';

export function fetchRecipeMeals(endpoint) {
  return async (dispatch) => {
    dispatch(accRequestRecipe());
    try {
      const data = await fetch(endpoint).then((elm) => elm.json());
      dispatch(accAddRecipeMeals(data));
    } catch (error) {
      dispatch(accFailRecipe(error.message));
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };
}

export function fetchRecipeDrinks(endpoint) {
  return async (dispatch) => {
    dispatch(accRequestRecipe());
    try {
      const data = await fetch(endpoint).then((elm) => elm.json());
      dispatch(accAddRecipeDrinks(data));
    } catch (error) {
      dispatch(accFailRecipe(error.message));
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };
}

export function fetchCategoryMeals(endpoint) {
  return async (dispatch) => {
    dispatch(accRequestRecipe());
    try {
      const data = await fetch(endpoint).then((elm) => elm.json());
      dispatch(accAddCategoryMeals(data));
    } catch (error) {
      dispatch(accFailRecipe(error.message));
    }
  };
}

export function fetchCategoryDrinks(endpoint) {
  return async (dispatch) => {
    dispatch(accRequestRecipe());
    try {
      const data = await fetch(endpoint).then((elm) => elm.json());
      dispatch(accAddCategoryDrinks(data));
    } catch (error) {
      dispatch(accFailRecipe(error.message));
    }
  };
}

export const takeRecipe = async (typ, id) => {
  const url = typ === 'Meal'
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const data = await fetch(url).then((elm) => elm.json());

  const response = typ === 'Meal'
    ? data.meals
    : data.drinks;
  return response;
};
