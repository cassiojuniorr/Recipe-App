import React from 'react';
import PropTypes from 'prop-types';

class StartButton extends React.Component {
  handleStartRecipe = () => {
    const { history, pageActual, recipe } = this.props;
    const URL_FOOD = `/foods/${recipe.idMeal}/in-progress`;
    const URL_DRINK = `/drinks/${recipe.idDrink}/in-progress`;
    history.push(pageActual === 'foods' ? URL_FOOD : URL_DRINK);
  };

  showStartButton = () => {
    const { match: { params: recipeId } } = this.props;
    const progressStore = JSON.parse(localStorage.getItem('doneRecipes')) !== null
      ? JSON.parse(localStorage.getItem('doneRecipes'))
      : [];
    const bool = progressStore.some((ing) => recipeId.recipeId === ing.id);
    return !bool;
  };

  showNameButton = () => {
    const { match: { params: recipeId }, pageActual } = this.props;
    const progressStore = JSON.parse(localStorage.getItem('inProgressRecipes')) !== null
      ? JSON.parse(localStorage.getItem('inProgressRecipes'))
      : { cocktails: {}, meals: {} };

    if (pageActual === 'foods') {
      if (Object.keys(progressStore.meals).includes(recipeId.recipeId) === false) {
        return false;
      }
      if (Object.keys(progressStore.meals).includes(recipeId.recipeId) === true) {
        return true;
      }
    }
    if (pageActual === 'drinks') {
      if (Object.keys(progressStore.cocktails).includes(recipeId.recipeId) === false) {
        return false;
      }
      if (Object.keys(progressStore.cocktails).includes(recipeId.recipeId) === true) {
        return true;
      }
    }
  };

  render() {
    return (
      <div>
        { this.showStartButton() && (
          <button
            className="starRecipe"
            position="fixed"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ this.handleStartRecipe }
          >
            { this.showNameButton() ? 'Continue Recipe' : 'Start Recipe' }
          </button>
        )}
      </div>
    );
  }
}

StartButton.propTypes = {
  pageActual: PropTypes.string.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({ pathname: PropTypes.string }),
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }),
  }).isRequired,
  recipe: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
  }).isRequired,
};

export default StartButton;
