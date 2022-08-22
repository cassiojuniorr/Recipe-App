import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Test SearchBarRadios', () => {
  afterEach(() => jest.resetAllMocks());

  it('Test Fist Letter Radio', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(endpoint),
    });

    history.push('/drinks');

    const imgSearch = screen.getByTestId('search-top-btn');

    userEvent.click(imgSearch);

    const inputSearch = screen.getByTestId('search-input');
    const firsLettertRadio = screen.getByTestId('first-letter-search-radio');

    userEvent.type(inputSearch, 'a');
    userEvent.click(firsLettertRadio);
    userEvent.click(screen.getByTestId('exec-search-btn'));
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(endpoint));
  });
  it('Test Ingredient Radio', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin';

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(endpoint),
    });

    history.push('/drinks');

    const imgSearch = screen.getByTestId('search-top-btn');

    userEvent.click(imgSearch);

    const inputSearch = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');

    userEvent.type(inputSearch, 'gin');
    userEvent.click(ingredientRadio);
    userEvent.click(screen.getByTestId('exec-search-btn'));
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(endpoint));
  });
});
