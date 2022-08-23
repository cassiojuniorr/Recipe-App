import {
  REQUEST_API,
  ADD_RECIPE_MEALS,
  ADD_RECIPE_DRINKS,
  FAIL_API,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  load: false,
  meals: [],
  drinks: [],
  error: '',
};

const RECIPE_LIMIT = 11;

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
  case FAIL_API:
    return ({
      ...state,
      load: false,
      meals: [],
      drinks: [],
      error: action.error,
    });

  default:
    return state;
  }
};

export default recipeReducer;
