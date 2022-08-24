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
      searchActivated: false,
    };
  }

  componentDidMount() {
    const { makeSearchDrinks, searchCategoryDrinks } = this.props;
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    makeSearchDrinks(endpoint);
    const endpointCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    searchCategoryDrinks(endpointCategory);
  }

  toggleSearchInput = () => {
    const { searchActivated } = this.state;
    this.setState({ searchActivated: !searchActivated });
  }

  render() {
    const { drinks } = this.props;
    const { searchActivated } = this.state;
    if (drinks.length === 1 && searchActivated === true) {
      return <Redirect to={ `/drinks/${drinks[0].idDrink}` } />;
    }
    return (
      <div>
        <Header
          title="Drinks"
          searchActivated={ searchActivated }
          toggleSearchInput={ this.toggleSearchInput }
        />
        <Recipes title="Drinks" />
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
