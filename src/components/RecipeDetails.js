import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RecipeDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const { detailsID, typeOfRequest } = this.props;
    const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailsID}`;
    const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${detailsID}`;
    try {
      const data = await fetch(typeOfRequest === 'food' ? foodEndpoint : drinkEndpoint);
      const result = await data.json();
      this.setState({ data: result });
    } catch (error) {
      return error;
    }
  }

  render() {
    const { detailsID, typeOfRequest } = this.props;
    const { data } = this.state;
    return (
      { detailsID, typeOfRequest, data }
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
