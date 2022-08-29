import React from 'react';
import RecipeDetails from '../components/RecipeDetails';

class DrinksId extends React.Component {
  render() {
    return (
      <RecipeDetails { ...this.props } />
    );
  }
}

export default DrinksId;
