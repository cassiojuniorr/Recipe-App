import React from 'react';
import PropTypes from 'prop-types';
import RecipeInProgress from '../components/RecipeInProgress';

function FoodsIdInProgress({ match: { params: recipeId } }) {
  return (
    <div>
      <RecipeInProgress pageActual="Meal" recipeId={ recipeId.recipeId } />
    </div>
  );
}

FoodsIdInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default FoodsIdInProgress;
