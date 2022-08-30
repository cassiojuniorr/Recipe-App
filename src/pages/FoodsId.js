import React from 'react';
import RecipeDetails from '../components/RecipeDetails';

class FoodsId extends React.Component {
  render() {
    return (
      <RecipeDetails pageActual="foods" { ...this.props } />
    );
  }
}

export default FoodsId;
