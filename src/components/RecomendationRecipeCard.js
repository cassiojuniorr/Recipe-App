import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from '../styles/detailsRecipe.module.scss';

class RecomendationRecipeCard extends React.Component {
  render() {
    const { data, typeOfRequest, index } = this.props;
    const FOOD_TYPE = ['strMealThumb', 'strMeal', 'strCategory'];
    const DRINK_TYPE = ['strDrinkThumb', 'strDrink', ''];
    const TYPE = typeOfRequest === 'foods' ? DRINK_TYPE : FOOD_TYPE;
    const {
      containerRecomendation,
      imgRecomendation,
      titleRecomendation } = style;
    return (
      <div className={ containerRecomendation }>
        <img
          src={ data[TYPE[0]] }
          alt={ data.strCategory }
          data-testid={ `${index}-recomendation-card` }
          height="180"
          width="180"
          className={ imgRecomendation }
        />
        <h1
          data-testid={ `${index}-recomendation-title` }
          className={ titleRecomendation }
        >
          { data[TYPE[1]] }
        </h1>
        { typeOfRequest === 'foods' && (
          <h1 className={ titleRecomendation }>{ data.strAlcoholic }</h1>
        ) }
      </div>
    );
  }
}

RecomendationRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  typeOfRequest: PropTypes.string.isRequired,
  data: PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};

export default connect(null, null)(RecomendationRecipeCard);
