import { combineReducers } from 'redux';
import user from './User';
import RecipeReducer from './RecipeReducer';

const rootReducer = combineReducers({
  user,
  RecipeReducer,
});

export default rootReducer;
