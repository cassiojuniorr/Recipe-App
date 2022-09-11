import React from 'react';
import PropTypes from 'prop-types';
import RecomendationRecipeCard from './RecomendationRecipeCard';
import shareIcon from '../images/shareIcon.svg';
import toggleFavorite from '../services/toggleFavorite';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import StartButton from './StartButton';
import style from '../styles/detailsRecipe.module.scss';

const copy = require('clipboard-copy');

class RecipeDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      recomendedRecipes: [],
      copyed: false,
      favoriteState: false,
    };
  }

  componentDidMount() {
    this.initialize();
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const { match: { params: recipeId } } = this.props;
    const favoriteStore = JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    this.setState({ favoriteState: favoriteStore.some((rcp) => rcp.id
      === recipeId.recipeId) });
  };

  initialize = async () => {
    const { match: { params: recipeId }, pageActual } = this.props;
    const MAX_RECOMENDED_RECIPES = 6;
    const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId.recipeId}`;
    const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId.recipeId}`;
    const foodRecomended = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const drinkRecomended = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const selectedTypeUrl = pageActual === 'foods' ? foodEndpoint : drinkEndpoint;
    const selectedTypeUrl2 = pageActual === 'foods' ? drinkRecomended : foodRecomended;
    const newData = await this.fetchApi(selectedTypeUrl);
    this.setState({ recipe: newData[pageActual === 'foods' ? 'meals' : 'drinks'][0] });
    const recomendedLinks = await this.fetchApi(selectedTypeUrl2);
    const recomendedLinksCuted = await recomendedLinks[pageActual === 'foods'
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

  getIngredients = () => {
    const { recipe } = this.state;
    const INGREDIENTS_KEYS = Object.keys(recipe).filter((tag) => tag
      .includes('Ingredient'));
    const MEASURE_KEYS = Object.keys(recipe).filter((tag) => tag
      .includes('Measure'));
    const INGREDIENTS_VALUES = [];
    INGREDIENTS_KEYS.forEach((key, index) => {
      if (recipe[key] !== '') {
        INGREDIENTS_VALUES.push(`${recipe[key]} - ${recipe[MEASURE_KEYS[index]]}`);
      }
    });
    return INGREDIENTS_VALUES;
  };

  handleShare = () => {
    const { pageActual } = this.props;
    const { recipe } = this.state;
    if (pageActual === 'foods') {
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
    const { pageActual } = this.props;
    const { recipe, favoriteState } = this.state;
    const urlId = pageActual === 'foods' ? recipe.idMeal : recipe.idDrink;
    toggleFavorite(recipe, urlId, pageActual, favoriteState);
    this.setState({ favoriteState: !favoriteState });
  };

  render() {
    const { recipe, recomendedRecipes, copyed, favoriteState } = this.state;
    const { pageActual } = this.props;
    const FOOD_TYPE = ['strMeal', 'strMealThumb', 'idMeal'];
    const DRINK_TYPE = ['strDrink', 'strDrinkThumb', 'idDrink'];
    const TYPE = pageActual === 'foods' ? FOOD_TYPE : DRINK_TYPE;
    const INGREDIENTS_VALUES = this.getIngredients();
    const {
      containerDetail,
      titleDetail,
      firstImg,
      wrapfirstImg,
      categoryDetail,
      containerBtn,
      btnShare,
      btnFav,
      containerCopy,
      linkCopy,
      containerIngredient,
      ingredientDetail,
      titleIngredient,
      instructionDetails,
      youtube } = style;
    return (
      <>
        <div className={ containerDetail }>
          <h3
            data-testid="recipe-title"
            className={ titleDetail }
          >
            { recipe[TYPE[0]] }
          </h3>
          <div className={ wrapfirstImg }>
            <img
              data-testid="recipe-photo"
              height="180"
              width="180"
              className={ firstImg }
              src={ recipe[TYPE[1]] }
              alt={ recipe[TYPE[0]] }
            />
          </div>
          <p data-testid="recipe-category" className={ categoryDetail }>
            { pageActual === 'foods'
              ? recipe.strCategory : `${recipe.strCategory} - ${recipe.strAlcoholic}` }
          </p>
          <div className={ containerBtn }>
            { copyed && (
              <div className={ containerCopy }>
                <h3 className={ linkCopy }>Link copied!</h3>
              </div>
            )}
            <button
              type="button"
              onClick={ this.handleShare }
              className={ btnShare }
            >
              <img src={ shareIcon } alt="share recipe" data-testid="share-btn" />
            </button>
            <button
              type="button"
              onClick={ this.makeFave }
              className={ btnFav }
            >
              { this.favoriteButton(favoriteState) }
            </button>
          </div>
          <p className={ titleIngredient }>Ingredients:</p>
          <ul className={ containerIngredient }>
            { INGREDIENTS_VALUES.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
                className={ ingredientDetail }
              >
                {ingredient}
              </li>))}
          </ul>
          <p data-testid="instructions" className={ instructionDetails }>
            Instructions:
            { recipe.strInstructions }
          </p>
          { pageActual === 'foods' && (
            <div className={ youtube }>
              <iframe
                width="300"
                height="300"
                src={ `https://www.youtube.com/embed/${
                  recipe.strYoutube?.split('=')[1]
                }` }
                title={ recipe.strMeal }
                data-testid="video"
              />
            </div>
          )}
          <div className="sroll">
            { recomendedRecipes.map((RecRec, index) => (
              <RecomendationRecipeCard
                key={ index }
                index={ index }
                data={ RecRec }
                typeOfRequest={ pageActual }
              />)) }
          </div>
        </div>
        <StartButton { ...this.props } pageActual={ pageActual } recipe={ recipe } />
      </>
    );
  }
}

RecipeDetails.propTypes = {
  pageActual: PropTypes.string.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({ pathname: PropTypes.string }),
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default RecipeDetails;
