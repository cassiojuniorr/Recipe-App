import React from 'react';
import propTypes from 'prop-types';
import RecipeInProgress from '../components/RecipeInProgress';

function FoodsIdInProgress({ match: { params: recipeId } }) {
  return (
    <div>
      <h1>FoodsIdInProgress</h1>
      <RecipeInProgress pageActual="Meal" recipeId={ recipeId.recipeId } />
    </div>
  );
}

FoodsIdInProgress.prototype = {
  match: propTypes.shape({
    params: propTypes.shape({
      recipeId: propTypes.number.isRequired,
    }),
  }),
};

export default FoodsIdInProgress;
