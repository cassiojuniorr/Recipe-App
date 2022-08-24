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
      searchActivated: false,
    };
  }

  componentDidMount() {
    const { makeSearchMeals, searchCategoryMeals } = this.props;
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    makeSearchMeals(endpoint);
    const endpointCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    searchCategoryMeals(endpointCategory);
  }

  toggleSearchInput = () => {
    const { searchActivated } = this.state;
    this.setState({ searchActivated: !searchActivated });
  }

  render() {
    const { meals } = this.props;
    const { searchActivated } = this.state;
    if (meals.length === 1 && searchActivated === true) {
      return <Redirect to={ `/foods/${meals[0].idMeal}` } />;
    }
    return (
      <div>
        <Header
          title="Foods"
          searchActivated={ searchActivated }
          toggleSearchInput={ this.toggleSearchInput }
        />
        <Recipes title="Foods" />
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
