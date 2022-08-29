import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RecomendationRecipeCard extends React.Component {
  render() {
    const { data, typeOfRequest } = this.props;
    const FOOD_TYPE = ['strMealThumb', 'strMeal', 'strCategory'];
    const DRINK_TYPE = ['strDrinkThumb', 'strCategory', 'strAlcoholic'];
    const TYPE = typeOfRequest === 'foods' ? DRINK_TYPE : FOOD_TYPE;
    return (
      <div>
        <img src={ data[TYPE[0]] } alt={ data.strCategory } />
        <h3>{ data[TYPE[1]] }</h3>
        <h4>{ data[TYPE[2]] }</h4>
      </div>
    );
  }
}

RecomendationRecipeCard.default = {

};

RecomendationRecipeCard.propTypes = {
  typeOfRequest: PropTypes.string.isRequired,
  data: PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};

/* const mapStateToProps = ({ details: { detailsID, typeOfRequest } }) => ({
  detailsID,
  typeOfRequest,
}); */

export default connect(null, null)(RecomendationRecipeCard);
