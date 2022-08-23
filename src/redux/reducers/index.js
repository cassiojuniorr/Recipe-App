import { combineReducers } from 'redux';
import user from './User';
import recipeReducer from './RecipeReducer';

const rootReducer = combineReducers({
  user,
  recipeReducer,
});

export default rootReducer;
