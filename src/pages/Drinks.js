import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCards from '../components/RecipeCards';
import { fetchRecipeDrinks } from '../services/fetchApi';

class Drinks extends React.Component {
  componentDidMount() {
    const { makeSearchDrinks } = this.props;
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    makeSearchDrinks(endpoint);
  }

  render() {
    const { drinks } = this.props;
    if (drinks.length === 1) return <Redirect to={ `/drinks/${drinks[0].idDrink}` } />;
    return (
      <div>
        <Header title="Drinks" />
        <RecipeCards />
        <Footer />
      </div>
    );
  }
}

Drinks.propTypes = {
  drinks: propTypes.arrayOf(propTypes.object).isRequired,
  makeSearchDrinks: propTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  drinks: store.recipeReducer.drinks,
});

const mapDispatchToProps = (dispatch) => ({
  makeSearchDrinks: (endpoint) => dispatch(fetchRecipeDrinks(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
