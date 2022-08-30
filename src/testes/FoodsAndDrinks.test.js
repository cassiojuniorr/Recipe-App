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

// const recipeMeals = [{
//   idMeal: '52977',
//   strCategory: 'Side',
//   strMeal: 'Corba',
//   strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
//   strIngredient1: 'Lentils',
//   strInstructions: 'Pick through your lentils for any foreign.',
//   strMeasure1: '1 cup ',
// }];

// const recipeDrinks = [{
//   idDrink: '15997',
//   strAlcoholic: 'Optional alcohol',
//   strCategory: 'Ordinary Drink',
//   strDrink: 'GG',
//   strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
//   strIngredient1: 'Galliano',
//   strInstructions: 'Pour the Galliano liqueur over ice. ',
//   strMeasure1: '2 1/2 shots ',
// }];

// const recomendedMeals = [
//   {
//     strCategory: 'Side',
//     strMeal: 'Corba',
//     strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
//   },
//   {
//     strCategory: 'Side',
//     strMeal: 'Burek',
//     strMealThumb: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
//   },
// ];

// const recomendedDrinks = [
//   {
//     strAlcoholic: 'Optional alcohol',
//     strCategory: 'Ordinary Drink',
//     strDrink: 'GG',
//     strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
//   },
//   {
//     strAlcoholic: 'Alcoholic',
//     strCategory: 'Cocktail',
//     strDrink: 'A1',
//     strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
//   },
// ];

describe('Teste da Tela principal de receitas ', () => {
  afterEach(() => jest.resetAllMocks());

  it('Testando a tela de comidas', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(categoryMeals),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(meals),
    });

    // jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    //   json: jest.fn().mockResolvedValueOnce(recipeMeals),
    // });

    // jest.spyOn(global, 'fetch').mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(recomendedDrinks),
    // });

    history.push('/foods');

    const buttonCategory = await screen.findByTestId('Beef-category-filter');
    const buttonAll = screen.getByTestId('All-category-filter');
    expect(buttonCategory && buttonAll).toBeInTheDocument();

    userEvent.click(buttonCategory);
    userEvent.click(buttonCategory);
    userEvent.click(buttonAll);

    // const meal = await screen.findByRole('link', { name: 'Corba Corba' });
    // userEvent.click(meal);
  });
  it('Testando a tela de bebidas', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(categoryDrinks),
    });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinks),
    });

    // jest.spyOn(global, 'fetch').mockImplementation((url) => {
    //   if()
    // });

    // jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    //   json: jest.fn().mockResolvedValueOnce(recipeDrinks),
    // });

    // jest.spyOn(global, 'fetch').mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(recomendedMeals),
    // });

    history.push('/drinks');

    const buttonCategory2 = await screen.findByTestId('Ordinary Drink-category-filter');
    const buttonAll2 = screen.getByTestId('All-category-filter');
    expect(buttonCategory2 && buttonAll2).toBeInTheDocument();

    userEvent.click(buttonCategory2);
    userEvent.click(buttonCategory2);
    userEvent.click(buttonAll2);

    // const drink = await screen.findByRole('link', { name: 'GG GG' });
    // userEvent.click(drink);
  });
});
