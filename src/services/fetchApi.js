import {
  accRequestRecipe,
  accAddRecipeMeals,
  accAddRecipeDrinks,
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
