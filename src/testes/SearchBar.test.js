import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Test SearchBar', () => {
  afterEach(() => jest.resetAllMocks());

  it('Renderiza o componente', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    const imgSearch = screen.getByTestId('search-top-btn');

    userEvent.click(imgSearch);

    expect(screen.getByTestId('search-input')).toBeDefined();
    expect(screen.getByTestId('ingredient-search-radio')).toBeDefined();
    expect(screen.getByTestId('name-search-radio')).toBeDefined();
    expect(screen.getByTestId('first-letter-search-radio')).toBeDefined();
    expect(screen.getByTestId('exec-search-btn')).toBeDefined();
  });

  it('Test Ingredient', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chiken';

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(endpoint),
    });

    history.push('/foods');

    const imgSearch = screen.getByTestId('search-top-btn');

    userEvent.click(imgSearch);

    const inputSearch = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');

    userEvent.type(inputSearch, 'chiken');
    userEvent.click(ingredientRadio);
    userEvent.click(screen.getByTestId('exec-search-btn'));
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(endpoint));
  });
});
