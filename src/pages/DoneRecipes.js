import React, { useState } from 'react';
import { connect } from 'react-redux';
// import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import style from '../styles/doneRecipes.module.scss';

const copy = require('clipboard-copy');

const recipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

function DoneRecipes() {
  // const [recipeState, setRecipe] = useState({ recipe: [] });
  // teste
  const [typeState, setType] = useState('');
  const [copyState, setCopy] = useState(false);

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

  const { containerDone, imgDone } = style;

  return (
    <div>
      <Header title="Done Recipes" />
      <div className={ containerDone }>

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
          data-testid="filter-by-drink-btn"
          name="drinksBtn"
          onClick={ filterFunc }
        >
          Drinks
        </button>
        { recipes.filter((recipe) => recipe.type !== typeState)
          .map((rcp, index) => (
            <div key={ rcp.id }>

              <Link to={ `/${rcp.type}s/${rcp.id}` }>
                <img
                  className={ imgDone }
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

              {copyState && <h1>Link copied!</h1>}

              <button
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
          ))}
      </div>
    </div>
  );
}

// DoneRecipes.propTypes = {
//   recipes: propTypes.arrayOf(propTypes.objectOf(propTypes.string)).isRequired,
// };

export default connect(null, null)(DoneRecipes);