import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class RecipeCards extends React.Component {
  render() {
    const { drinks, meals } = this.props;
    const isDrink = drinks.length > 0;
    const recipesList = isDrink ? drinks : meals;
    return (
      <div>
        { recipesList.map((recipe, index) => {
          const recipeThumb = isDrink ? recipe.strDrinkThumb : recipe.strMealThumb;
          const recipeName = isDrink ? recipe.strDrink : recipe.strMeal;
          return (
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <h3 data-testid={ `${index}-card-name` }>{ recipeName }</h3>
              <img
                src={ recipeThumb }
                alt={ recipeName }
                data-testid={ `${index}-card-img` }
                width="200"
                height="200"
              />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  meals: state.recipeReducer.meals,
  drinks: state.recipeReducer.drinks,
});

RecipeCards.propTypes = {
  meals: propTypes.arrayOf(propTypes.object).isRequired,
  drinks: propTypes.arrayOf(propTypes.object).isRequired,
};

export default connect(mapStateToProps)(RecipeCards);
