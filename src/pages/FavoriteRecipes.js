import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import style from '../styles/favoriteRecipes.module.scss';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavorite] = useState([]);
  const [filter, setFilter] = useState('allBtn');
  const [copyState, setCopy] = useState(false);

  useEffect(() => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

    setFavorite([...favorite]);
  }, []);

  const filterFunc = ({ target: { name } }) => {
    if (name === 'allBtn') {
      setFilter('allBtn');
      return;
    }
    const typ = name === 'foodBtn' ? 'drink' : 'food';
    setFilter(typ);
  };

  const toggleShare = (type, id) => {
    copy(`${window.location.origin}/${type}s/${id}`);
    setCopy(true);
    setTimeout(() => setCopy(false), Number('2000'));
  };

  const makeFave = (id) => {
    const favoriteStore = JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

    const filterFav = favoriteStore.filter((rcp) => rcp.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(filterFav));

    setFavorite([...filterFav]);
  };

  const searchByBarOn = () => {};
  searchByBarOn();

  const { containerFavorite } = style;
  return (
    <div>
      <Header title="Favorite Recipes" searchByBarOn={ searchByBarOn } />
      <div className={ containerFavorite }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          name="allBtn"
          onClick={ filterFunc }
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
          name="foodBtn"
          onClick={ filterFunc }
        >
          Food
        </button>

        <button
          type="button"
          name="drinksBtn"
          data-testid="filter-by-drink-btn"
          onClick={ filterFunc }
        >
          Drinks
        </button>

        {
          favoriteRecipes.filter((recipe) => recipe.type !== filter)
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
                  onClick={ () => toggleShare(recipe.type, recipe.id) }
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
                  onClick={ () => makeFave(recipe.id) }
                >
                  <img
                    src={ blackHeartIcon }
                    alt="Favorite BTN"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default connect(null, null)(FavoriteRecipes);
