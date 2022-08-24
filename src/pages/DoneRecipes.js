import React, { useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes({ recipes }) {
  const [recipeState, setRecipe] = useState({ recipe: [] });
  const history = useHistory();

  const filterAll = () => {
    const recipe = recipes.filter();
    setRecipe({ recipe });
  };

  const foodFilter = () => {
    const recipe = recipes.filter();
    setRecipe({ recipe });
  };

  const drinksFilter = () => {
    const recipe = recipes.filter();
    setRecipe({ recipe });
  };

  const toggleShare = () => {
    const { location: { pathname } } = history;
    copy(pathname);
  };

  const { recipe } = recipeState;

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        { recipe.map((rcp, index) => (
          <div key={ rcp }>
            <button
              type="button"
              data-testid="filter-by-all-btn"
              onClick={ filterAll }
            >
              All
            </button>

            <button
              type="button"
              data-testid="filter-by-food-btn"
              onClick={ foodFilter }
            >
              Food
            </button>

            <button
              type="button"
              data-testid="filter-by-drink-btn"
              onClick={ drinksFilter }
            >
              Drinks
            </button>

            <button type="button" onClick={ history.push(pathname) }>
              <img src="" alt="" data-testid={ `${index}-horizontal-image` } />
            </button>

            <span data-testid={ `${index}-horizontal-top-text` }>{rcp.strCategory}</span>

            <button
              type="button"
              data-testid={ `${index}-horizontal-name` }
              onClick={ history.push(pathname) }
            >
              {rcp.name}
            </button>

            <span data-testid={ `${index}-horizontal-done-date` }>{rcp.date}</span>

            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ toggleShare }
            >
              <img src={ shareIcon } alt="share-btn" />
            </button>
            <span
              data-testid={ `${index}-${rcp.tagName}-horizontal-tag` }
            >
              {rcp.tagName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

DoneRecipes.propTypes = {
  recipes: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
};

// const mapDispatchToProps = (dispatch) => ({
//   userLoginDispatch: (email, password) => dispatch(userLogin(email, password)),
// });

export default connect(null, null)(DoneRecipes);
