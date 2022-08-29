import React from 'react';
import RecipeDetails from '../components/RecipeDetails';

class FoodsId extends React.Component {
  render() {
    return (
      <RecipeDetails { ...this.props } />
    );
  }
}

export default FoodsId;
