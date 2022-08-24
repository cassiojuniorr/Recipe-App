import {
  REQUEST_API,
  ADD_RECIPE_MEALS,
  ADD_RECIPE_DRINKS,
  ADD_CATEGORY_MEALS,
  ADD_CATEGORY_DRINKS,
  FAIL_API,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  load: false,
  meals: [],
  drinks: [],
  categoryMeals: [],
  categoryDrinks: [],
  error: '',
};

const RECIPE_LIMIT = 11;
const CATEGORY_LIMIT = 4;

const recipeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return ({
      ...state,
      load: true,
    });
  case ADD_RECIPE_MEALS:
    return ({
      ...state,
      load: false,
      meals: [...action.meals.meals].filter((meal, index) => index <= RECIPE_LIMIT),
      drinks: [],
    });
  case ADD_RECIPE_DRINKS:
    return ({
      ...state,
      load: false,
      meals: [],
      drinks: [...action.drinks.drinks].filter((drink, index) => index <= RECIPE_LIMIT),
    });
  case ADD_CATEGORY_MEALS:
    return ({
      ...state,
      load: false,
      categoryMeals: [...action.categories.meals]
        .filter((category, index) => index <= CATEGORY_LIMIT),
      categoryDrinks: [],
    });
  case ADD_CATEGORY_DRINKS:
    return ({
      ...state,
      load: false,
      categoryMeals: [],
      categoryDrinks: [...action.categories.drinks]
        .filter((category, index) => index <= CATEGORY_LIMIT),
    });
  case FAIL_API:
    return ({
      ...state,
      load: false,
      meals: [],
      drinks: [],
      categoryMeals: [],
      categoryDrinks: [],
      error: action.error,
    });
  default:
    return state;
  }
};

export default recipeReducer;
