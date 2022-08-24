import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function RecipeInProgress({ pageActual, meals, drinks }) {
  const [pageState, setPage] = useState({ page: '' });
  const [recipeState, setRecipe] = useState({ recipes: [] });
  const [redirectState, setRedirect] = useState({ redirect: false });
  const [markedState, setMarked] = useState({ marked: false });

  useEffect(() => {
    const page = pageActual.includes('Foods') ? 'foods' : 'drinks';
    const pag = drinks.length > 0;
    const recipes = pag ? drinks : meals;
    const obj = localStorage.getItem('inProgressRecipes');
    if (recipes === obj) setMarked({ marked: true });

    setRecipe({ recipes });
    setPage({ page });
  }, []);

  const scratchIngredient = (id) => {
    const { recipes } = recipeState;
    const { page } = pageState;
    const obj = recipes.find((elm) => (
      (page === 'foods') ? elm.idMeal === id : elm.idDrinks === elm
    ));
    localStorage.setItem('inProgressRecipes', obj);
  };

  const toggleFinish = () => {
    setRedirect({ redirect: true });
  };

  const { recipes } = recipeState;
  const { page } = pageState;
  const { redirect } = redirectState;
  const { marked } = markedState;

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
            <button type="button" data-testid="share-btn">SHARE</button>
            <button type="button" data-testid="favorite-btn">FAVORITE</button>
            <span data-testid="recipe-category">{elm.strCategory}</span>
            <div
              data-testid={ `${i}-ingredient-step` }
            >
              <span>{elm.strIngredient.concat(i)}</span>
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
