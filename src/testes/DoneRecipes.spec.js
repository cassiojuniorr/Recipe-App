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

describe('Teste Done Recipes', () => {
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
  });

  it('Usando os filtros', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    localStorage.setItem('doneRecipes', JSON.stringify(recipes));

    history.push('/done-recipes');

    const AllBtn = screen.getByTestId('filter-by-all-btn');
    const FoodBtn = screen.getByTestId('filter-by-food-btn');
    const DrinksBtn = screen.getByTestId('filter-by-drink-btn');
    // const shareBtnOne = screen.getByTestId('0-horizontal-share-btn');
    // const shareBtnTwo = screen.getByTestId('1-horizontal-share-btn');

    userEvent.click(FoodBtn);

    expect(screen.getByTestId('0-horizontal-name')).toBeDefined();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeDefined();
    // referência https://www.tabnine.com/code/javascript/functions/dom-testing-library/queryByTestId
    expect(screen.queryByTestId('1-horizontal-top-text')).not.toBeTruthy();

    // userEvent.click(shareBtnOne);
    // expect(screen.getByText('Link copied!')).toBeDefined();

    userEvent.click(DrinksBtn);

    expect(screen.getByTestId('0-horizontal-top-text')).toHaveTextContent('Alcoholic');

    // userEvent.click(shareBtnTwo);
    // expect(screen.getByText('Link copied!')).toBeDefined();

    userEvent.click(AllBtn);
  });
});
