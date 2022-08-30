import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { mockFavorite } from './helpers/mocks';

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Teste página de Favorite Recipes', () => {
  afterEach(() => localStorage.clear('doneRecipes'));

  it('Renderiza na tela', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorite));

    history.push('/favorite-recipes');

    expect(screen.getByTestId('filter-by-all-btn')).toBeDefined();
    expect(screen.getByTestId('filter-by-food-btn')).toBeDefined();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeDefined();
    expect(await screen.findByTestId('0-horizontal-top-text')).toBeDefined();
    expect(await screen.findByTestId('1-horizontal-top-text')).toBeDefined();
    expect(screen.getByTestId('0-horizontal-name')).toBeDefined();
    expect(screen.getByTestId('1-horizontal-name')).toBeDefined();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeDefined();
    expect(screen.getByTestId('1-horizontal-share-btn')).toBeDefined();
    expect(screen.getByTestId('0-horizontal-favorite-btn')).toBeDefined();
    expect(screen.getByTestId('1-horizontal-favorite-btn')).toBeDefined();

    userEvent.click(await screen.findByTestId('0-horizontal-image'));

    expect(history.location.pathname).toBe('/foods/52977');
  });

  it('Usando os filtros', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorite));
    jest.spyOn(navigator.clipboard, 'writeText');

    history.push('/favorite-recipes');

    const AllBtn = screen.getByTestId('filter-by-all-btn');
    const FoodBtn = screen.getByTestId('filter-by-food-btn');
    const DrinksBtn = screen.getByTestId('filter-by-drink-btn');
    const shareBtnOne = await screen.findByTestId('0-horizontal-share-btn');
    const shareBtnTwo = await screen.findByTestId('1-horizontal-share-btn');

    userEvent.click(FoodBtn);

    expect(screen.getByTestId('0-horizontal-name')).toBeDefined();
    expect(screen.queryByTestId('1-horizontal-top-text')).not.toBeTruthy();

    userEvent.click(shareBtnOne);
    expect(screen.getByText('Link copied!')).toBeDefined();

    userEvent.click(DrinksBtn);
    userEvent.click(shareBtnTwo);
    expect(screen.getByText('Link copied!')).toBeDefined();

    expect(
      screen.getByTestId('0-horizontal-top-text'),
    ).toHaveTextContent('Optional alcohol');

    userEvent.click(AllBtn);
    userEvent.click(await screen.findByTestId('0-horizontal-favorite-btn'));
    userEvent.click(await screen.findByTestId('0-horizontal-image'));
    expect(history.location.pathname).toBe('/drinks/15997');
  });
});
