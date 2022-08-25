import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeDetailsCard from '../components/RecipeDetailsCard';

class RecipeDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: [],
      recomendedRecipes: [],
    };
  }

  componentDidMount() {
    this.initialize();
  }

  initialize = () => {
    const { detailsID, typeOfRequest } = this.props;
    const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailsID}`;
    const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${detailsID}`;
    const foodRecomended = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
    const drinkRecomended = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
    const newData = this.fetchApi(typeOfRequest === 'food' ? foodEndpoint
      : drinkEndpoint);
    this.setState({ recipe: newData });
    const recomendedLinks = this.fetchApi(typeOfRequest === 'food' ? drinkRecomended
      : foodRecomended);
    this.setState({ recomendedRecipes: recomendedLinks });
  }

  fetchApi = async (endpoint) => {
    try {
      const data = await fetch(endpoint);
      const result = await data.json();
      return result;
    } catch (error) {
      return error;
    }
  }

  render() {
    const { detailsID, typeOfRequest } = this.props;
    const { recipe, recomendedRecipes } = this.state;
    return (
      <>
        <RecipeDetailsCard />
        <button type="button" data-testid="share-btn">Share</button>
        <button type="button" data-testid="favorite-btn">Favorite</button>
        { !localStorage.getItem('doneRecipes').includes() && (
          <button type="button" data-testid="start-recipe-btn">
            {
              localStorage.getItem('inProgressRecipes').includes()
                ? 'Continue Recipe' : 'Start Recipe'
            }
          </button>
        ) }
      </>
    );
  }
}

RecipeDetails.propTypes = {
  detailsID: PropTypes.string.isRequired,
  typeOfRequest: PropTypes.string.isRequired,
};

mapStateToProps = ({ details: { detailsID, typeOfRequest } }) => ({
  detailsID,
  typeOfRequest,
});

export default connect(mapStateToProps, null)(RecipeDetails);
