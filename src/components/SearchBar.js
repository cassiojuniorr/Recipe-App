import React from 'react';

function SearchBar() {
  return (
    <div>
      <form>
        <input type="text" data-testid="search-input" />

        <label htmlFor="ingredient-search-radio">
          Ingredient
          <input type="radio" data-testid="ingredient-search-radio" />
        </label>

        <label htmlFor="name-search-radio">
          Name
          <input type="radio" data-testid="name-search-radio" />
        </label>

        <label htmlFor="first-letter-search-radio">
          First Letter
          <input type="radio" data-testid="first-letter-search-radio" />
        </label>

        <button type="button" data-testid="exec-search-btn">SEARCH</button>
      </form>
    </div>
  );
}

export default SearchBar;
