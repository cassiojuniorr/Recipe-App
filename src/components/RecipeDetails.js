import React from 'react';
import PropTypes from 'prop-types';
import RecomendationRecipeCard from './RecomendationRecipeCard';

class RecipeDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: [],
      recomendedRecipes: [],
      detailsID: '',
      typeOfRequest: '',
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    const { history } = this.props;
    const pathUrl = history.location.pathname;
    const pathSpliced = pathUrl.split('/');
    // array 0 '' 1 food/drink 2 id
    this.setState((prevState) => (
      { ...prevState, detailsID: pathSpliced[2], typeOfRequest: pathSpliced[1] }),
    () => { this.initialize(); });
  }

  initializeLocalStoreKey = (key) => {
    localStorage.setItem(key, []);
  }

  initialize = async () => {
    // const { history } = this.props;
    const { detailsID, typeOfRequest } = this.state;
    const DONE_RECIPE = localStorage.getItem('doneRecipes');
    const IN_PROGRESS = localStorage.getItem('inProgressRecipes');
    if (DONE_RECIPE === null) this.initializeLocalStoreKey('doneRecipes');
    if (IN_PROGRESS === null) this.initializeLocalStoreKey('inProgressRecipes');
    const MAX_RECOMENDED_RECIPES = 6;
    const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailsID}`;
    const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${detailsID}`;
    const foodRecomended = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const drinkRecomended = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const selectedTypeUrl = typeOfRequest === 'foods' ? foodEndpoint : drinkEndpoint;
    const selectedTypeUrl2 = typeOfRequest === 'foods' ? drinkRecomended : foodRecomended;
    const newData = await this.fetchApi(selectedTypeUrl);
    this.setState({ recipe: newData[typeOfRequest === 'foods' ? 'meals' : 'drinks'][0] });
    const recomendedLinks = await this.fetchApi(selectedTypeUrl2);
    const recomendedLinksCuted = await recomendedLinks[typeOfRequest === 'foods'
      ? 'drinks' : 'meals'].slice(0, MAX_RECOMENDED_RECIPES);
    this.setState({ recomendedRecipes: await recomendedLinksCuted });
  }

  fetchApi = async (endpoint) => {
    try {
      const data = await fetch(endpoint);
      const result = await data.json();
      return result;
    } catch (error) {
      return error;
    }
  }

  renderWithDrink = () => {
    const { recipe } = this.state;
    const INGREDIENTS_KEYS = Object.keys(recipe).filter((tag) => tag
      .includes('Ingredient'));
    const INGREDIENTS_VALUES = [];
    INGREDIENTS_KEYS.forEach((key) => {
      if (recipe[key] !== null) {
        INGREDIENTS_VALUES.push(recipe[key]);
      }
    });
    return INGREDIENTS_VALUES;
  };

  renderWithFood = () => {
    const { recipe } = this.state;
    const INGREDIENTS_KEYS = Object.keys(recipe).filter((tag) => tag
      .includes('Ingredient'));
    const INGREDIENTS_VALUES = [];
    INGREDIENTS_KEYS.forEach((key) => {
      if (recipe[key].length > 0) {
        INGREDIENTS_VALUES.push(recipe[key]);
      }
    });
    return INGREDIENTS_VALUES;
  };

  handleStartRecipe = () => {
    const { history } = this.props;
    const { typeOfRequest, recipe } = this.state;
    const URL_FOOD = `/foods/${recipe.idMeal}/in-progress`;
    const URL_DRINK = `/drinks/${recipe.idDrink}/in-progress`;
    history.push(typeOfRequest === 'foods' ? URL_FOOD : URL_DRINK);
  };

  renderRecipe = () => {
    const { recipe, typeOfRequest, recomendedRecipes } = this.state;
    const FOOD_TYPE = ['strMeal', 'srtMealThumb', 'idMeal'];
    const DRINK_TYPE = ['strDrink', 'srtDrinkThumb', 'idDrink'];
    const TYPE = typeOfRequest === 'foods' ? FOOD_TYPE : DRINK_TYPE;
    if (Object.keys(recipe).length > 0) {
      const INGREDIENTS_VALUES = typeOfRequest === 'foods' ? this.renderWithFood()
        : this.renderWithDrink();
      return (
        <>
          <div>
            <h3 data-testid="recipe-title">{ recipe[TYPE[0]] }</h3>
            <img
              data-testid="recipe-photo"
              src={ recipe[TYPE[1]] }
              alt={ recipe[TYPE[0]] }
            />
            <p data-testid="recipe-category">{ recipe.strCategory }</p>
            <p>Ingredients:</p>
            <ul>
              { INGREDIENTS_VALUES.map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
                </li>))}
            </ul>
            <p data-testid="instructions">
              Instructions:
              {' '}
              { recipe.strInstructions }
            </p>
            { typeOfRequest === 'foods' && (
              <video>
                <track
                  kind="captions"
                  src={ recipe.strYoutube }
                />
              </video>
            )}
            <div>
              { recomendedRecipes.map((RecRec, index) => (
                <RecomendationRecipeCard
                  key={ index }
                  data={ RecRec }
                  typeOfRequest={ typeOfRequest }
                />)) }
            </div>
          </div>
          <div>
            <button type="button" data-testid="share-btn">Share</button>
            <button type="button" data-testid="favorite-btn">Favorite</button>
          </div>
          { !localStorage.getItem('doneRecipes').includes(recipe[TYPE[2]]) && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ this.handleStartRecipe }
            >
              {
                localStorage.getItem('inProgressRecipes').includes(recipe[TYPE[2]])
                  ? 'Continue Recipe' : 'Start Recipe'
              }
            </button>
          ) }
        </>
      );
    }
  };

  render() {
    const { recipe, recomendedRecipes } = this.state;
    return (
      ((Object.keys(recipe).length > 0 && Object.keys(recomendedRecipes).length > 0))
        && this.renderRecipe()
    );
  }
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({ pathname: PropTypes.string }),
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default RecipeDetails;
