import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/doneRecipes.css';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [recipeState, setRecipe] = useState([]);
  const [typeState, setType] = useState('');
  const [copyState, setCopy] = useState(false);
  useEffect(() => {
    const doneStore = JSON.parse(localStorage.getItem('doneRecipes')) !== null
      ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
    setRecipe([...doneStore]);
  }, []);

  const filterFunc = ({ target: { name } }) => {
    if (name === 'allBtn') {
      setType('allBtn');
      return;
    }
    const typ = name === 'foodBtn' ? 'drink' : 'food';
    setType(typ);
  };

  const toggleShare = (type, id) => {
    copy(`${window.location.origin}/${type}s/${id}`);
    setCopy(true);
    setTimeout(() => setCopy(false), Number('2000'));
  };

  const searchByBarOn = () => {};
  searchByBarOn();

  return (
    <div>
      <Header title="Done Recipes" searchByBarOn={ searchByBarOn } />
      <div className="containerDone">
        <div className="buttons">
          <button
            className="btnCategory"
            type="button"
            data-testid="filter-by-all-btn"
            name="allBtn"
            onClick={ filterFunc }
          >
            All
          </button>
          <button
            className="btnCategory"
            type="button"
            data-testid="filter-by-food-btn"
            name="foodBtn"
            onClick={ filterFunc }
          >
            Food
          </button>
          <button
            className="btnCategory"
            type="button"
            data-testid="filter-by-drink-btn"
            name="drinksBtn"
            onClick={ filterFunc }
          >
            Drinks
          </button>
        </div>
        {
          recipeState[0] !== undefined
          && (
            recipeState.filter((recipe) => recipe.type !== typeState)
              .map((rcp, index) => (
                <div className="containerRecipe" key={ rcp.id }>
                  <Link to={ `/${rcp.type}s/${rcp.id}` }>
                    <img
                      className="imgDone"
                      src={ rcp.image }
                      alt={ rcp.name }
                      data-testid={ `${index}-horizontal-image` }
                    />
                  </Link>
                  <span data-testid={ `${index}-horizontal-top-text` }>
                    {
                      rcp.type === 'food'
                        ? `${rcp.nationality} - ${rcp.category}`
                        : `${rcp.alcoholicOrNot}`
                    }
                  </span>
                  <Link
                    to={ `/${rcp.type}s/${rcp.id}` }
                  >
                    <span data-testid={ `${index}-horizontal-name` }>{rcp.name}</span>
                  </Link>
                  <span
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {rcp.doneDate}
                  </span>
                  {copyState && <h1 className="titileFood">Link copied!</h1>}
                  <button
                    className="btnFav"
                    type="button"
                    onClick={ () => toggleShare(rcp.type, rcp.id) }
                  >
                    <img
                      src={ shareIcon }
                      alt="share-btn"
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                  </button>
                  {rcp.tags.map((tag) => (
                    <span
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                      key={ tag }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ))
          )
        }
      </div>
    </div>
  );
}

export default connect(null, null)(DoneRecipes);
