import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const categoryMeals = {
  meals: [
    { strCategory: 'Beef' }, { strCategory: 'Breakfast' },
  ],
};

const categoryDrinks = {
  drinks: [
    { strCategory: 'Ordinary Drink' }, { strCategory: 'Cocktail' },
  ],
};

const meals = {
  meals: [
    {
      idMeal: '52977',
      strMeal: 'Corba',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      idMeal: '53060',
      strMeal: 'Burek',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    },
  ],
};

const drinks = {
  drinks: [
    {
      idDrink: '15997',
      strDrink: 'GG',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
    {
      idDrink: '17222',
      strDrink: 'A1',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    },
  ],
};

describe('Teste da Tela principal de receitas ', () => {
  afterEach(() => jest.resetAllMocks());

  it('Testando a tela de comidas', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(categoryMeals),
    });

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    history.push('/foods');

    const buttonCategory = await screen.findByTestId('Beef-category-filter');
    const buttonAll = screen.getByTestId('All-category-filter');
    expect(buttonCategory && buttonAll).toBeInTheDocument();

    userEvent.click(buttonCategory);
    userEvent.click(buttonCategory);
    userEvent.click(buttonAll);

    const meal = await screen.findByRole('link', { name: 'Corba Corba' });
    userEvent.click(meal);
  });
  it('Testando a tela de bebidas', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(categoryDrinks),
    });

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });

    history.push('/drinks');

    const buttonCategory2 = await screen.findByTestId('Ordinary Drink-category-filter');
    const buttonAll2 = screen.getByTestId('All-category-filter');
    expect(buttonCategory2 && buttonAll2).toBeInTheDocument();

    userEvent.click(buttonCategory2);
    userEvent.click(buttonCategory2);
    userEvent.click(buttonAll2);

    const drink = await screen.findByRole('link', { name: 'GG GG' });
    userEvent.click(drink);
  });
});
