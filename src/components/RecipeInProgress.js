import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/inProgress.css';
import style from '../styles/inProgress.module.scss';
import { takeRecipe } from '../services/fetchApi';
import saveDoneRecipes from '../services/saveDoneRecipes';
import toggleFavorite from '../services/toggleFavorite';
import getProgress from '../services/getProgress';
import getIngredientsOrMeasure from '../services/getIngredientsOrMeasure';

const copy = require('clipboard-copy');

function RecipeInProgress({ pageActual, recipeId }) {
  const history = useHistory();
  const { location: { pathname } } = history;
  const pathWithBars = pathname.split('/');
  const path = pathWithBars[1];
  const urlId = pathname.replace(/\D/g, '');

  const [recipeState, setRecipe] = useState({ recipe: [] });
  const [ingredientState, setIngredient] = useState([]);
  const [measureState, setMeasure] = useState([]);
  const [favoriteState, setFavorite] = useState(false);
  const [finishState, setFinish] = useState(0);
  const [copyState, setCopy] = useState({ copyed: false });

  useEffect(() => {
    const getRecipe = async () => {
      const recipe = await takeRecipe(pageActual, recipeId);
      setRecipe({ recipe: [recipe] });
    };
    const getLocalStorage = () => {
      const favoriteStore = JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
        ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

      setFavorite(favoriteStore.some((recipe) => recipe.id === recipeId));
    };
    getLocalStorage();
    getRecipe();
  }, []);
  const getIngredients = () => {
    const { recipe } = recipeState;
    const ingredients = recipe.length !== 0
      ? getIngredientsOrMeasure(recipe[0], 'Ingredient')
        .filter((elm) => typeof elm === 'string' && elm.length > 0) : [];
    const measures = recipe.length !== 0 ? getIngredientsOrMeasure(recipe[0], 'Measure')
      .filter((elm) => typeof elm === 'string' && elm.length > 0) : [];
    setIngredient(ingredients);
    setMeasure(measures);
  };
  useEffect(() => { getIngredients(); }, [recipeState]);
  const makeFave = () => {
    const { recipe } = recipeState;
    toggleFavorite(recipe[0], urlId, path, favoriteState);
    setFavorite(!favoriteState);
  };
  const favoriteButton = (fav) => (
    <img
      src={ (fav === true) ? blackHeartIcon : whiteHeartIcon }
      alt="Favorite BTN"
      data-testid="favorite-btn"
    />
  );
  const handleShare = () => {
    if (pageActual === 'Meal') {
      copy(`http://localhost:3000/foods/${urlId}`);
    }
    if (pageActual === 'Drink') {
      copy(`http://localhost:3000/drinks/${urlId}`);
    }
    setCopy({ copyed: true });
    setTimeout(() => setCopy(false), Number('2000'));
  };
  const setCheckBox = ({ target }) => {
    const check = document.getElementsByName(target.id);
    getProgress(ingredientState[target.id],
      urlId, pageActual.toLowerCase(), target.checked);
    if (target.checked === true) {
      check[0].className = 'marked';
    }
    if (target.checked === false) {
      check[0].className = '';
    }
  };
  const checkedOn = (ingredient) => {
    const key = (pageActual === 'Meal') ? 'meals' : 'cocktails';
    if (pageActual === 'Meal') {
      const progressStore = JSON.parse(localStorage.getItem('inProgressRecipes')) !== null
        ? JSON.parse(localStorage.getItem('inProgressRecipes'))
        : { cocktails: {}, meals: {} };
      if (Object.keys(progressStore.meals).includes(recipeId) === false) {
        return false;
      }
      if (Object.keys(progressStore.meals).includes(recipeId) === true) {
        const bool = progressStore[key][recipeId].some((ing) => ingredient === ing);
        return bool;
      }
    }
    if (pageActual === 'Drink') {
      const progressStore = JSON.parse(localStorage.getItem('inProgressRecipes')) !== null
        ? JSON.parse(localStorage.getItem('inProgressRecipes'))
        : { cocktails: {}, meals: {} };

      if (Object.keys(progressStore.cocktails).includes(recipeId) === false) {
        return false;
      }
      if (Object.keys(progressStore.cocktails).includes(recipeId) === true) {
        const bool = progressStore[key][recipeId].some((ing) => ingredient === ing);

        return bool;
      }
    }
  };
  const habilitFinishBTN = ({ target }) => {
    if (target.checked === true) {
      setFinish((prevFinish) => prevFinish + 1);
    } else {
      setFinish((prevFinish) => prevFinish - 1);
    }
  };
  const toggleFinish = () => {
    saveDoneRecipes(recipeState.recipe[0], urlId, pageActual);
    history.push('/done-recipes');
  };
  const { copyed } = copyState;
  const { recipe } = recipeState;
  const {
    containerInProgress,
    imgInProgress,
    titileFood,
    btnShare,
    btnFav,
    categoryProgress,
    wrapIngredients,
    ingredients,
    intpIngredient,
    btnFinish,
    containerBtn,
    containerCopy,
    linkCopy } = style;

  return (
    <div>
      {
        recipe[0] !== undefined
        && (
          <div
            key={ (pageActual === 'Meal') ? recipe[0].idMeal : recipe[0].idDrink }
            className={ containerInProgress }
          >
            <h1 data-testid="recipe-title" className={ titileFood }>
              {(pageActual === 'Meal')
                ? recipe[0].strMeal
                : recipe[0].strDrink}
            </h1>
            <img
              src={
                (pageActual === 'Meal')
                  ? recipe[0].strMealThumb
                  : recipe[0].strDrinkThumb
              }
              alt="recipePhoto"
              data-testid="recipe-photo"
              className={ imgInProgress }
            />
            <div className={ containerBtn }>
              { copyed && (
                <div className={ containerCopy }>
                  <h3 className={ linkCopy }>Link copied!</h3>
                </div>
              )}
              <button
                type="button"
                onClick={ handleShare }
                className={ btnShare }
              >
                <img src={ shareIcon } alt="share recipe" data-testid="share-btn" />
              </button>
              <button
                type="button"
                onClick={ () => makeFave() }
                className={ btnFav }
              >
                { favoriteButton(favoriteState) }
              </button>
            </div>
            <span
              data-testid="recipe-category"
              className={ categoryProgress }
            >
              {recipe[0].strCategory}
            </span>
            <ul className={ wrapIngredients }>
              {ingredientState.map((ing, index) => (
                <li
                  data-testid={ `${index}-ingredient-step` }
                  key={ index }
                  className={ ingredients }
                >
                  <input
                    type="checkbox"
                    checked={ checkedOn(ing) }
                    onChange={ habilitFinishBTN }
                    onClick={ (e) => setCheckBox(e) }
                    data-testid={ `${index}-check-box` }
                    id={ index }
                    className={ intpIngredient }
                  />
                  <p
                    name={ index }
                    className={ checkedOn(ing) ? 'marked' : '' }
                    id={ index }
                  >
                    {`${measureState[index]}, ${ing}`}
                  </p>
                </li>

              ))}
            </ul>
            <span data-testid="instructions">{recipe[0].strInstructions}</span>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ (ingredientState.length !== finishState) }
              onClick={ () => toggleFinish() }
              className={ btnFinish }
            >
              Finish Recipe
            </button>
          </div>
        )
      }
    </div>
  );
}
RecipeInProgress.propTypes = {
  pageActual: propTypes.string.isRequired,
  recipeId: propTypes.string.isRequired,
};

export default connect(null, null)(RecipeInProgress);
