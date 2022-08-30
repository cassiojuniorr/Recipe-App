import React from 'react';
import RecipeDetails from '../components/RecipeDetails';

class DrinksId extends React.Component {
  render() {
    return (
      <RecipeDetails pageActual="drinks" { ...this.props } />
    );
  }
}

export default DrinksId;
