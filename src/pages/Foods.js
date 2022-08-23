import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCards from '../components/RecipeCards';
import { fetchRecipeMeals } from '../services/fetchApi';

class Foods extends React.Component {
  componentDidMount() {
    const { makeSearchMeals } = this.props;
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    makeSearchMeals(endpoint);
  }

  render() {
    const { meals } = this.props;
    if (meals.length === 1) return <Redirect to={ `/foods/${meals[0].idMeal}` } />;
    return (
      <div>
        <Header title="Foods" />
        <RecipeCards />
        <Footer />
      </div>
    );
  }
}

Foods.propTypes = {
  meals: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
  makeSearchMeals: propTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  meals: store.recipeReducer.meals,
});

const mapDispatchToProps = (dispatch) => ({
  makeSearchMeals: (endpoint) => dispatch(fetchRecipeMeals(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
