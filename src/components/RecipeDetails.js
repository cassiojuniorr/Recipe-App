import React from 'react';
import PropTypes from 'prop-types';
import RecomendationRecipeCard from './RecomendationRecipeCard';
import shareIcon from '../images/shareIcon.svg';
import toggleFavorite from '../services/toggleFavorite';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

class RecipeDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: [],
      recomendedRecipes: [],
      detailsID: '',
      typeOfRequest: '',
      copyed: false,
      favoriteState: false,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getLocalStorage = () => {
    const { recipe, typeOfRequest } = this.state;
    const TYPE = typeOfRequest === 'foods' ? 'idMeal' : 'idDrink';
    const recipeId = recipe[TYPE];
    const favoriteStore = JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

    this.setState({ favoriteState: favoriteStore.some((rcp) => rcp.id
      === recipeId) });
  };

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
    const { detailsID, typeOfRequest } = this.state;
    // const DONE_RECIPE = localStorage.getItem('doneRecipes');
    // const IN_PROGRESS = localStorage.getItem('inProgressRecipes');
    // if (DONE_RECIPE === null) this.initializeLocalStoreKey('doneRecipes');
    // if (IN_PROGRESS === null) this.initializeLocalStoreKey('inProgressRecipes');
    const MAX_RECOMENDED_RECIPES = 6;
    const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailsID}`;
    const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${detailsID}`;
    const foodRecomended = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const drinkRecomended = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const selectedTypeUrl = typeOfRequest === 'foods' ? foodEndpoint : drinkEndpoint;
    const selectedTypeUrl2 = typeOfRequest === 'foods' ? drinkRecomended : foodRecomended;
    const newData = await this.fetchApi(selectedTypeUrl);
    this.setState({ recipe: newData[typeOfRequest === 'foods' ? 'meals' : 'drinks'][0] });
    this.getLocalStorage();
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

  handleShare = () => {
    const { recipe, typeOfRequest } = this.state;
    if (typeOfRequest === 'foods') {
      const urlId = recipe.idMeal;
      copy(`http://localhost:3000/foods/${urlId}`);
    } else {
      const urlId = recipe.idDrink;
      copy(`http://localhost:3000/drinks/${urlId}`);
    }
    this.setState({ copyed: true });
    setTimeout(() => this.setState({ copyed: false }), Number('2000'));
  };

  favoriteButton = (fav) => (
    <img
      src={ (fav === true) ? blackHeartIcon : whiteHeartIcon }
      alt="Favorite BTN"
      data-testid="favorite-btn"
    />
  );

  makeFave = () => {
    const { recipe, typeOfRequest, favoriteState } = this.state;
    const urlId = typeOfRequest === 'foods' ? recipe.idMeal : recipe.idDrink;
    toggleFavorite(recipe, urlId, typeOfRequest, favoriteState);
    this.setState({ favoriteState: !favoriteState });
  };

  test = () => {
    const { typeOfRequest } = this.state;
    const FOOD_TYPE = ['strMeal', 'strMealThumb', 'idMeal'];
    const DRINK_TYPE = ['strDrink', 'strDrinkThumb', 'idDrink'];
    const TYPE = typeOfRequest === 'foods' ? FOOD_TYPE : DRINK_TYPE;
    const TYPE2 = typeOfRequest === 'foods' ? 'meals' : 'cocktails';
    const LOCALSTORAGE = JSON.parse(localStorage
      .getItem('inProgressRecipes'));
    console.log(LOCALSTORAGE);
    // console.log(LOCALSTORAGE[TYPE2]);
    // console.log(LOCALSTORAGE[TYPE2][recipe[TYPE[2]]]);
  }

  renderStartRecipe = () => {
    let response = '';
    console.log('alo');
    const { recipe } = this.state;
    const FOOD_TYPE = ['strMeal', 'strMealThumb', 'idMeal'];
    const DRINK_TYPE = ['strDrink', 'strDrinkThumb', 'idDrink'];
    const TYPE = typeOfRequest === 'foods' ? FOOD_TYPE : DRINK_TYPE;
    const TYPE2 = typeOfRequest === 'foods' ? 'meals' : 'cocktails';
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const RECIPE_INPROGRESS = JSON.parse(localStorage.getItem('inProgressRecipes'));
      console.log(RECIPE_INPROGRESS[TYPE2][recipe[TYPE[2]]]);
      console.log(RECIPE_INPROGRESS);
      response = 'Continue Recipe';
      //  ? 'Continue Recipe' : 'Start Recipe';
    } else {
      console.log('nulo');
      response = 'Start Recipe';
    }
    return response;
  }

  renderStartRecipeBtn = () => {
    const { recipe, typeOfRequest } = this.state;
    const FOOD_TYPE = ['strMeal', 'strMealThumb', 'idMeal'];
    const DRINK_TYPE = ['strDrink', 'strDrinkThumb', 'idDrink'];
    const TYPE = typeOfRequest === 'foods' ? FOOD_TYPE : DRINK_TYPE;
    const callReturn = () => (
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ this.handleStartRecipe }
      >
        { this.renderStartRecipe }
      </button>
    );
    if (localStorage.getItem('doneRecipes') !== null
      && !localStorage.getItem('doneRecipes').includes(recipe[TYPE[2]])) {
      return callReturn;
    }
    if (localStorage.getItem('doneRecipes') === null) return callReturn;
  }

  renderRecipe = () => {
    this.test();
    const { recipe, typeOfRequest, recomendedRecipes, copyed,
      favoriteState } = this.state;
    const FOOD_TYPE = ['strMeal', 'strMealThumb', 'idMeal'];
    const DRINK_TYPE = ['strDrink', 'strDrinkThumb', 'idDrink'];
    const TYPE = typeOfRequest === 'foods' ? FOOD_TYPE : DRINK_TYPE;
    const TYPE2 = typeOfRequest === 'foods' ? 'meals' : 'cocktails';
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
              <iframe
                width="300"
                height="300"
                src={ `https://www.youtube.com/embed/${
                  recipe.strYoutube?.split('=')[1]
                  // recipeData.strYoutube?.split('=')[1]
                }` }
                title={ recipe.strMeal }
                data-testid="video"
              />
            )}
            <div>
              { recomendedRecipes.map((RecRec, index) => (
                <RecomendationRecipeCard
                  index={ index }
                  key={ index }
                  data={ RecRec }
                  typeOfRequest={ typeOfRequest }
                />)) }
            </div>
          </div>
          <div>
            { copyed && (<h1>Link copied!</h1>)}
            <button
              type="button"
              data-testid="share-btn"
              onClick={ this.handleShare }
            >
              <img src={ shareIcon } alt="share recipe" data-testid="share-btn" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ this.makeFave }
            >
              { this.favoriteButton(favoriteState) }
            </button>
          </div>
          { this.renderStartRecipeBtn }
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
