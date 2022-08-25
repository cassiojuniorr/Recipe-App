import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RecipeDetailsCard extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  render() {
    const { detailsID, typeOfRequest } = this.props;
    const { data } = this.state;
    return (
      <div>
        <h3 data-testid="recipe-title">{}</h3>
        <img data-testid="recipe-photo" src={} alt={} />
        <p data-testid="recipe-category">{}</p>
        { INGREDIENTS.map((ingredient, index) => <p key={index} data-testid={`${index}-ingredient-name-and-measure`}>{ingredient}</p>)}
        <p data-testid="instructions">{}</p>
        { typeOfRequest === 'food' && <video src={} /> }
        <div>
          { RECOMENDED_RECIPES.map((recipe, index) => (
            <p key={ index } data-testid={ `${index}-recomendation-card` }>{ recipe }</p>
          )) }
        </div>
      </div>
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

export default connect(mapStateToProps, null)(RecipeDetailsCard);
