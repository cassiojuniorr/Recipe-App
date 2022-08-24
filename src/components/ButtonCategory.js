import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipeMeals, fetchRecipeDrinks } from '../services/fetchApi';

class ButtonCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      filterOn: false,
    };
  }

  searchByCategory = (category) => {
    const { makeSearchMeals, makeSearchDrinks, title } = this.props;
    const { filterOn } = this.state;
    const filterFoods = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const filterDrinks = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    const clearFilterFoods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const clearFilterDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (title === 'Drinks') {
      if (filterOn === false) {
        makeSearchDrinks(filterDrinks);
        this.setState({ filterOn: !filterOn });
      } else {
        makeSearchDrinks(clearFilterDrinks);
        this.setState({ filterOn: !filterOn });
      }
    }
    if (title === 'Foods') {
      if (filterOn === false) {
        makeSearchMeals(filterFoods);
        this.setState({ filterOn: !filterOn });
      } else {
        makeSearchMeals(clearFilterFoods);
        this.setState({ filterOn: !filterOn });
      }
    }
  }

  render() {
    const { testId, strCategory } = this.props;
    return (
      <button
        type="button"
        data-testid={ testId }
        onClick={ () => this.searchByCategory(strCategory) }
      >
        { strCategory }
      </button>
    );
  }
}

ButtonCategory.propTypes = {
  title: propTypes.string.isRequired,
  testId: propTypes.string.isRequired,
  strCategory: propTypes.string.isRequired,
  makeSearchMeals: propTypes.func.isRequired,
  makeSearchDrinks: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  makeSearchMeals: (endpoint) => dispatch(fetchRecipeMeals(endpoint)),
  makeSearchDrinks: (endpoint) => dispatch(fetchRecipeDrinks(endpoint)),
});

export default connect(null, mapDispatchToProps)(ButtonCategory);
