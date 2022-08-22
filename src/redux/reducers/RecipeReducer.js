import {
  REQUEST_API,
  ADD_RECIPE,
  FAIL_API,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  load: false,
  recipe: [],
  error: '',
};

const RecipeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return ({
      ...state,
      load: true,
    });
  case ADD_RECIPE:
    return ({
      ...state,
      load: false,
      recipe: action.recipe,
    });
  case FAIL_API:
    return ({
      ...state,
      load: false,
      error: action.error,
    });

  default:
    return state;
  }
};

export default RecipeReducer;
