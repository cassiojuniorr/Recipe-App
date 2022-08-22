import {
  accRequestRecipe,
  accAddRecipe,
  accFailRecipe,
} from '../redux/actions/index';

function fetchRecipe(endpoint) {
  return async (dispatch) => {
    dispatch(accRequestRecipe());
    try {
      const data = fetch(endpoint).then((elm) => elm.json());
      dispatch(accAddRecipe(data));
    } catch (error) {
      dispatch(accFailRecipe(error.message));
    }
  };
}

export default fetchRecipe;
