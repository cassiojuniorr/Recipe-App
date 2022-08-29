import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const recipes = [
  {
    id: '52977',
    type: 'food',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: '2022-08-27T07:33:48.720Z',
    tags: ['Soup'],
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    doneDate: '022-08-29T02:02:50.823Z',
    tags: [],
  },
];

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Teste Done Recipes', () => {
  afterEach(() => localStorage.clear('doneRecipes'));

  it('Renderiza na Tela', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    localStorage.setItem('doneRecipes', JSON.stringify(recipes));

    history.push('/done-recipes');

    expect(screen.getByTestId('filter-by-all-btn')).toBeDefined();
    expect(screen.getByTestId('filter-by-food-btn')).toBeDefined();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeDefined();
    expect(await screen.findByTestId('0-horizontal-top-text')).toBeDefined();
    expect(await screen.findByTestId('1-horizontal-top-text')).toBeDefined();
    expect(screen.getByTestId('0-horizontal-name')).toBeDefined();
    expect(screen.getByTestId('1-horizontal-name')).toBeDefined();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeDefined();
    expect(screen.getByTestId('1-horizontal-done-date')).toBeDefined();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeDefined();
    expect(screen.getByTestId('1-horizontal-share-btn')).toBeDefined();
    expect(screen.getByTestId('0-Soup-horizontal-tag')).toBeDefined();

    userEvent.click(await screen.findByTestId('0-horizontal-image'));
    expect(history.location.pathname).toBe('/foods/52977');
  });

  it('Usando os filtros', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    localStorage.setItem('doneRecipes', JSON.stringify(recipes));
    jest.spyOn(navigator.clipboard, 'writeText');

    history.push('/done-recipes');

    const AllBtn = screen.getByTestId('filter-by-all-btn');
    const FoodBtn = screen.getByTestId('filter-by-food-btn');
    const DrinksBtn = screen.getByTestId('filter-by-drink-btn');
    const shareBtnOne = await screen.findByTestId('0-horizontal-share-btn');
    const shareBtnTwo = await screen.findByTestId('1-horizontal-share-btn');

    userEvent.click(FoodBtn);

    expect(screen.getByTestId('0-horizontal-name')).toBeDefined();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeDefined();
    // referência https://www.tabnine.com/code/javascript/functions/dom-testing-library/queryByTestId
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
    userEvent.click(await screen.findByTestId('1-horizontal-image'));
    expect(history.location.pathname).toBe('/drinks/15997');
  });
});
