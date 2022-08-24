import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import { fetchRecipeDrinks, fetchCategoryDrinks } from '../services/fetchApi';

class Drinks extends React.Component {
  constructor() {
    super();
    this.state = {
      searchByBar: false,
    };
  }

  componentDidMount() {
    const { makeSearchDrinks, searchCategoryDrinks } = this.props;
    const endpointCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    searchCategoryDrinks(endpointCategory);
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    makeSearchDrinks(endpoint);
  }

  searchByBarOn = () => {
    this.setState({ searchByBar: true });
  }

  searchByCategoryOn = () => {
    this.setState({ searchByBar: false });
  }

  render() {
    const { drinks } = this.props;
    const { searchByBar } = this.state;
    if (drinks.length === 1 && searchByBar === true) {
      return <Redirect to={ `/drinks/${drinks[0].idDrink}` } />;
    }
    return (
      <div>
        <Header title="Drinks" searchByBarOn={ this.searchByBarOn } />
        <Recipes title="Drinks" searchByCategoryOn={ this.searchByCategoryOn } />
        <Footer />
      </div>
    );
  }
}

Drinks.propTypes = {
  drinks: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
  makeSearchDrinks: propTypes.func.isRequired,
  searchCategoryDrinks: propTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  drinks: store.recipeReducer.drinks,
});

const mapDispatchToProps = (dispatch) => ({
  makeSearchDrinks: (endpoint) => dispatch(fetchRecipeDrinks(endpoint)),
  searchCategoryDrinks: (endpoint) => dispatch(fetchCategoryDrinks(endpoint)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
