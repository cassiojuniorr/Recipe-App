import React from 'react';
import PropTypes from 'prop-types';
import RecipeInProgress from '../components/RecipeInProgress';

function DrinksIdInProgress({ match: { params: recipeId } }) {
  return (
    <div>
      DrinksIdInProgress
      <RecipeInProgress pageActual="Drink" recipeId={ recipeId.recipeId } />
    </div>
  );
}

DrinksIdInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinksIdInProgress;
