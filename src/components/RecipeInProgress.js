import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import isFavorite from '../images/whiteHeartIcon.svg';
import notFavorite from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgress({ pageActual, meals, drinks }) {
  const [pageState, setPage] = useState({ page: '' });
  const [recipeState, setRecipe] = useState({ recipes: [] });
  const [redirectState, setRedirect] = useState({ redirect: false });
  const [markedState, setMarked] = useState({ marked: false });
  const [favoriteState, setFavorite] = useState({ favoriteIcon: false });
  const [finishState, setFinish] = useState({ isDisabled: true });

  useEffect(() => {
    const page = pageActual.includes('Foods') ? 'foods' : 'drinks';
    const pag = drinks.length > 0;
    const recipes = pag ? drinks : meals;
    const obj = localStorage.getItem('inProgressRecipes');
    if (recipes === obj) setMarked({ marked: true });

    setRecipe({ recipes });
    setPage({ page });
  }, []);

  const scratchIngredient = () => {
    const { recipes } = recipeState;
    const { page } = pageState;
    const obj = recipes.find((elm) => (
      (page === 'foods') ? elm.idMeal === id : elm.idDrinks === elm
    ));
    setMarked((prevState) => ({ marked: !prevState.marked }));
    localStorage.setItem('inProgressRecipes', obj);
  };

  const toggleFavorite = () => {
    setFavorite((prevState) => ({ favoriteIcon: !prevState.favoriteIcon }));
  };

  const toggleFinish = () => {
    setRedirect({ redirect: true });
  };

  const { recipes } = recipeState;
  const { page } = pageState;
  const { redirect } = redirectState;
  const { marked } = markedState;
  const { favoriteIcon } = favoriteState;

  return (
    <div>
      {
        recipes.map((elm, i) => (
          <div key={ (page === 'foods') ? elm.idMeal : elm.idDrinks }>
            <img
              src={
                (page === 'foods')
                  ? elm.strMealThumb
                  : elm.strDrinkThumb
              }
              alt="recipePhoto"
              data-testid="recipe-photo"
            />

            <span data-testid="recipe-title">
              {(page === 'foods')
                ? elm.strMeal
                : elm.strDrink}
            </span>

            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => copy(elm) }
            >
              <img src={ shareIcon } alt="share-btn" />
            </button>

            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ toggleFavorite }
            >
              <img
                src={
                  (favoriteIcon) ? isFavorite : notFavorite
                }
                alt="favorite-btn"
              />
            </button>

            <span data-testid="recipe-category">{elm.strCategory}</span>

            <div
              data-testid={ `${i}-ingredient-step` }
            >
              <span>
                { marked === true ? (

                  <s>{elm.strIngredient.concat(i)}</s>
                ) : (
                  elm.strIngredient.concat(i)
                )}
              </span>
              <input
                type="checkbox"
                value={ marked }
                onChange={ scratchIngredient }
              />
            </div>
            <span data-testid="instructions">{elm.strInstructions}</span>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ isDisabled }
              onClick={ toggleFinish }
            >
              FINISH
            </button>
          </div>
        ))
      }
      {redirect && <Redirect to="/done-recipes" />}
    </div>

  );
}

RecipeInProgress.propTypes = {
  meals: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
  drinks: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
  pageActual: propTypes.string.isRequired,
};

const mapStateToProps = ({ recipeReducer: { meals, drinks } }) => ({ meals, drinks });

export default connect(mapStateToProps)(RecipeInProgress);
