import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRecipeMeals, fetchRecipeDrinks } from '../services/fetchApi';
import ButtonCategory from './ButtonCategory';
import style from '../styles/principalPage.module.scss';

class Recipes extends React.Component {
  clearSearchByCategory = () => {
    const { makeSearchMeals, makeSearchDrinks, title } = this.props;
    const clearFilterFoods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const clearFilterDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (title === 'Drinks') {
      makeSearchDrinks(clearFilterDrinks);
    } else {
      makeSearchMeals(clearFilterFoods);
    }
  }

  render() {
    const { drinks, meals, categoryMeals, categoryDrinks,
      title, searchByCategoryOn } = this.props;
    const isDrink = drinks.length > 0;
    const recipesList = isDrink ? drinks : meals;
    const categoryList = isDrink ? categoryDrinks : categoryMeals;
    const {
      containerRecipes,
      btnCategory,
      containerCategoryBtn,
      containerAll,
      containerFoods,
      wrapImg,
      titileFood,
      imgFood } = style;

    return (
      <div className={ containerRecipes }>
        <div>
          <div className={ containerCategoryBtn }>
            { categoryList.map((category, index) => {
              const { strCategory } = category;
              return (
                <ButtonCategory
                  key={ index }
                  title={ title }
                  testId={ `${strCategory}-category-filter` }
                  strCategory={ strCategory }
                  searchByCategoryOn={ searchByCategoryOn }
                />
              );
            })}
          </div>
          <div className={ containerAll }>
            <button
              type="button"
              data-testid="All-category-filter"
              onClick={ this.clearSearchByCategory }
              className={ btnCategory }
            >
              All
            </button>
          </div>
        </div>

        <div className={ containerFoods }>
          { recipesList.map((recipe, index) => {
            const recipeThumb = isDrink ? recipe.strDrinkThumb : recipe.strMealThumb;
            const recipeName = isDrink ? recipe.strDrink : recipe.strMeal;
            const recipeLink = isDrink
              ? `/drinks/${recipe.idDrink}` : `/foods/${recipe.idMeal}`;
            return (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ index }
                className={ wrapImg }
              >
                <Link to={ recipeLink }>
                  <h3
                    data-testid={ `${index}-card-name` }
                    className={ titileFood }
                  >
                    { recipeName }
                  </h3>
                  <img
                    src={ recipeThumb }
                    alt={ recipeName }
                    data-testid={ `${index}-card-img` }
                    className={ imgFood }
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Recipes.propTypes = {
  title: propTypes.string.isRequired,
  meals: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
  drinks: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
  categoryMeals: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
  categoryDrinks: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
  makeSearchMeals: propTypes.func.isRequired,
  makeSearchDrinks: propTypes.func.isRequired,
  searchByCategoryOn: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  meals: state.recipeReducer.meals,
  drinks: state.recipeReducer.drinks,
  categoryMeals: state.recipeReducer.categoryMeals,
  categoryDrinks: state.recipeReducer.categoryDrinks,
});

const mapDispatchToProps = (dispatch) => ({
  makeSearchMeals: (endpoint) => dispatch(fetchRecipeMeals(endpoint)),
  makeSearchDrinks: (endpoint) => dispatch(fetchRecipeDrinks(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
