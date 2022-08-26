import React from 'react';
import RecipeInProgress from '../components/RecipeInProgress';

function DrinksIdInProgress({ match: { params: recipeId } }) {
  return (
    <div>
      DrinksIdInProgress
      <RecipeInProgress pageActual="Drink" recipeId={ recipeId.recipeId } />
    </div>
  );
}

export default DrinksIdInProgress;
