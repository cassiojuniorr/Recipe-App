import React from 'react';
import RecipeInProgress from '../components/RecipeInProgress';

function FoodsIdInProgress({ match: { params: recipeId } }) {
  return (
    <div>
      <h1>FoodsIdInProgress</h1>
      <RecipeInProgress pageActual="Meal" recipeId={ recipeId.recipeId } />
    </div>
  );
}

export default FoodsIdInProgress;
