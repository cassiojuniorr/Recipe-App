import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RecomendationRecipeCard extends React.Component {
  render() {
    const { data, typeOfRequest, index } = this.props;
    const FOOD_TYPE = ['strMealThumb', 'strMeal', 'strCategory'];
    const DRINK_TYPE = ['strDrinkThumb', 'strDrink', ''];
    const TYPE = typeOfRequest === 'foods' ? DRINK_TYPE : FOOD_TYPE;
    return (
      <div>
        <img
          src={ data[TYPE[0]] }
          alt={ data.strCategory }
          data-testid={ `${index}-recomendation-card` }
          height="180"
          width="180"
        />
        <h3 data-testid={ `${index}-recomendation-title` }>{ data[TYPE[1]] }</h3>
        { typeOfRequest === 'foods' && <h4>{ data.strAlcoholic }</h4> }
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
