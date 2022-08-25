import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RecomendedRecipes extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  render() {
    const { typeOfRequest } = this.props;
    const { data } = this.state;
    return (
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

export default connect(mapStateToProps, null)(RecomendedRecipes);
