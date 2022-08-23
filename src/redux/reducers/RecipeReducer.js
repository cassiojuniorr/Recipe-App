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
      meals: [...action.meals.meals],
      drinks: [],
    });
  case ADD_RECIPE_DRINKS:
    return ({
      ...state,
      load: false,
      meals: [],
      drinks: [...action.drinks.drinks],
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
