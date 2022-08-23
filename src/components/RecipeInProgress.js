import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

function RecipeInProgress({ pageActual, meals, drinks }) {
  const [pageState, setPage] = useState({ page: '' });
  const [recipeState, setRecipe] = useState({ recipes: [] });

  useEffect(() => {
    const page = pageActual.includes('Foods') ? 'foods' : 'drinks';
    const pag = drinks.length > 0;
    const recipes = pag ? drinks : meals;

    setRecipe({ recipes });
    setPage({ page });
  }, []);

  const scratchIngredient = ({ target }) => { };

  const { recipes } = recipeState;
  const { page } = pageState;

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
            <span
              data-testid={ `${i}-ingredient-step` }
            >
              {elm.strIngredient.concat(i)}
              <input type="checkbox" onChange={ scratchIngredient } />
            </span>
            <span data-testid="instructions">{elm.strInstructions}</span>
            <button type="button" data-testid="finish-recipe-btn">FINISH</button>
          </div>
        ))
      }
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
