import React from 'react';
import propTypes from 'prop-types';
import RecipeInProgress from '../components/RecipeInProgress';

function DrinksIdInProgress({ match: { params: recipeId } }) {
  return (
    <div>
      DrinksIdInProgress
      <RecipeInProgress pageActual="Drink" recipeId={ recipeId.recipeId } />
    </div>
  );
}

DrinksIdInProgress.prototype = {
  match: propTypes.shape({
    params: propTypes.shape({
      recipeId: propTypes.number.isRequired,
    }),
  }),
};

export default DrinksIdInProgress;
