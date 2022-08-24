import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchRecipeMeals, fetchRecipeDrinks } from '../services/fetchApi';

function SearchBar({ makeSearchMeals, makeSearchDrinks, pageActual }) {
  const [state, setState] = useState({ inputSearch: '' });
  const [typeState, setType] = useState({ type: '' });
  const [pageState, setPage] = useState({ page: '' });

  const ENDPOINST = {
    foods: {
      ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
      name: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      firstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
    },
    drinks: {
      ingredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
      name: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      firstLetter: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
    },
  };

  useEffect(() => {
    const page = pageActual.includes('Foods') ? 'foods' : 'drinks';
    setPage({ page });
  }, []);

  const makeFetchApi = () => {
    const { inputSearch } = state;
    const { type } = typeState;
    const { page } = pageState;
    if (type === 'firstLetter' && inputSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (page === 'foods') {
      const endpoint = ENDPOINST.foods[type].concat(inputSearch);
      makeSearchMeals(endpoint);
    } else {
      const endpoint = ENDPOINST.drinks[type].concat(inputSearch);
      makeSearchDrinks(endpoint);
    }
  };

  const setChanges = ({ target }) => {
    setType({
      ...typeState,
      type: target.value,
    });
  };

  const { inputSearch } = state;
  const { type } = typeState;

  return (
    <div>
      <form>
        <input
          type="text"
          data-testid="search-input"
          value={ inputSearch }
          onChange={ ({ target }) => setState({ ...state, inputSearch: target.value }) }
        />

        <div>

          <label htmlFor="ingredient-search-radio">
            <input
              type="radio"
              name="typeSearch"
              data-testid="ingredient-search-radio"
              id="ingredient-search-radio"
              value="ingredient"
              onChange={ setChanges }
            />
            Ingredient
          </label>

          <label htmlFor="name-search-radio">
            <input
              type="radio"
              name="typeSearch"
              data-testid="name-search-radio"
              id="name-search-radio"
              value="name"
              onChange={ setChanges }

            />
            Name
          </label>

          <label htmlFor="first-letter-search-radio">
            <input
              type="radio"
              name="typeSearch"
              data-testid="first-letter-search-radio"
              id="first-letter-search-radio"
              value="firstLetter"
              onChange={ setChanges }
            />
            First Letter
          </label>
        </div>

        <button
          type="button"
          data-testid="exec-search-btn"
          disabled={ type.length === 0 || inputSearch.length === 0 }
          onClick={ makeFetchApi }
        >
          SEARCH
        </button>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  makeSearchMeals: PropTypes.func.isRequired,
  makeSearchDrinks: PropTypes.func.isRequired,
  pageActual: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  makeSearchMeals: (endpoint) => dispatch(fetchRecipeMeals(endpoint)),
  makeSearchDrinks: (endpoint) => dispatch(fetchRecipeDrinks(endpoint)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
