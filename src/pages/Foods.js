import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import { fetchRecipeMeals, fetchCategoryMeals } from '../services/fetchApi';

class Foods extends React.Component {
  constructor() {
    super();
    this.state = {
      searchByBar: false,
    };
  }

  componentDidMount() {
    const { makeSearchMeals, searchCategoryMeals } = this.props;
    const endpointCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    searchCategoryMeals(endpointCategory);
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    makeSearchMeals(endpoint);
  }

  searchByBarOn = () => {
    this.setState({ searchByBar: true });
  }

  searchByCategoryOn = () => {
    this.setState({ searchByBar: false });
  }

  render() {
    const { meals } = this.props;
    const { searchByBar } = this.state;
    if (meals.length === 1 && searchByBar === true) {
      return <Redirect to={ `/foods/${meals[0].idMeal}` } />;
    }
    return (
      <div>
        <Header title="Foods" searchByBarOn={ this.searchByBarOn } />
        <Recipes title="Foods" searchByCategoryOn={ this.searchByCategoryOn } />
        <Footer />
      </div>
    );
  }
}

Foods.propTypes = {
  meals: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
  makeSearchMeals: propTypes.func.isRequired,
  searchCategoryMeals: propTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  meals: store.recipeReducer.meals,
});

const mapDispatchToProps = (dispatch) => ({
  makeSearchMeals: (endpoint) => dispatch(fetchRecipeMeals(endpoint)),
  searchCategoryMeals: (endpoint) => dispatch(fetchCategoryMeals(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
