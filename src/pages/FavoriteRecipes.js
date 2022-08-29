import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import toggleFavorite from '../services/toggleFavorite';
import style from '../styles/favoriteRecipes.module.scss';

const copy = require('clipboard-copy');

class FavoriteRecipes extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: 'allBtn',
      favoriteRecipes: [],
      copyState: false,
      favoriteState: true,
    };
  }

  componentDidMount() {
    this.setState({
      favoriteRecipes: JSON.parse(localStorage.getItem('favoriteRecipes') || '[]'),
    });
  }

  filterFunc = ({ target: { name } }) => {
    if (name === 'allBtn') {
      this.setState({ filter: 'allBtn' });
    } else {
      const typ = name === 'foodBtn' ? 'drink' : 'food';
      this.setState({ filter: typ });
    }
  };

  toggleShare = (type, id) => {
    copy(`${window.location.origin}/${type}s/${id}`);
    this.setState({ copyState: true });
    setTimeout(() => this.setState({ copyState: false }), Number('2000'));
  };

  makeFave = (type, id, event) => {
    const { favoriteRecipes, favoriteState } = this.state;
    const { name } = event.target;
    toggleFavorite(favoriteRecipes[name], id, type, favoriteState);
    this.setState({ favoriteRecipes: !favoriteRecipes });
  };

  searchByBarOn = () => {}

  render() {
    this.searchByBarOn();
    const { favoriteRecipes, filter, copyState, favoriteState } = this.state;
    const { containerFavorite } = style;
    return (
      <div>
        <Header title="Favorite Recipes" searchByBarOn={ this.searchByBarOn } />
        <div className={ containerFavorite }>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            name="allBtn"
            onClick={ this.filterFunc }
          >
            All
          </button>

          <button
            type="button"
            data-testid="filter-by-food-btn"
            name="foodBtn"
            onClick={ this.filterFunc }
          >
            Food
          </button>

          <button
            type="button"
            name="drinksBtn"
            data-testid="filter-by-drink-btn"
            onClick={ this.filterFunc }
          >
            Drinks
          </button>
          {
            favoriteRecipes !== undefined && favoriteRecipes !== null
            && (
              favoriteRecipes.filter((rcp) => rcp.type !== filter)
                .map((recipe, index) => (
                  <div key={ recipe.id }>
                    <Link to={ `/${recipe.type}s/${recipe.id}` }>
                      <img
                        src={ recipe.image }
                        alt={ recipe.name }
                        data-testid={ `${index}-horizontal-image` }
                        width="300px"
                      />
                    </Link>

                    <span data-testid={ `${index}-horizontal-top-text` }>
                      {
                        recipe.type === 'food'
                          ? `${recipe.nationality} - ${recipe.category}`
                          : `${recipe.alcoholicOrNot}`
                      }
                    </span>

                    <Link
                      to={ `/${recipe.type}s/${recipe.id}` }
                    >
                      <span
                        data-testid={ `${index}-horizontal-name` }
                      >
                        {recipe.name}
                      </span>
                    </Link>

                    {copyState && <h1>Link copied!</h1>}
                    <button
                      type="button"
                      onClick={ () => this.toggleShare(recipe.type, recipe.id) }
                    >
                      <img
                        src={ shareIcon }
                        alt="share-btn"
                        data-testid={ `${index}-horizontal-share-btn` }
                      />
                    </button>

                    <button
                      type="button"
                      name={ index }
                      onClick={ (event) => this.makeFave(recipe.type, recipe.id, event) }
                    >
                      <img
                        src={ (favoriteState === true) ? blackHeartIcon : whiteHeartIcon }
                        alt="Favorite BTN"
                        data-testid={ `${index}-horizontal-favorite-btn` }
                      />
                    </button>
                  </div>
                ))
            )
          }
        </div>
      </div>
    );
  }
}

export default connect(null, null)(FavoriteRecipes);
