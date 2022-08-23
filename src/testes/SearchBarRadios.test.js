import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const drinks = {
  drinks: [
    {
      idDrink: '17222',
      strDrink: 'A1',
      strDrinkAlternate: null,
      strTags: null,
      strVideo: null,
      strCategory: 'Cocktail',
      strIBA: null,
      strAlcoholic: 'Alcoholic',
      strGlass: 'Cocktail glass',
      'strInstructionsZH-HANS': null,
      'strInstructionsZH-HANT': null,
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      strIngredient1: 'Gin',
      strIngredient2: 'Grand Marnier',
      strIngredient3: 'Lemon Juice',
      strIngredient4: 'Grenadine',
      strIngredient5: null,
      strIngredient6: null,
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '1 3/4 shot ',
      strMeasure2: '1 Shot ',
      strMeasure3: '1/4 Shot',
      strMeasure4: '1/8 Shot',
      strMeasure5: null,
      strMeasure6: null,
      strMeasure7: null,
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strImageSource: null,
      strImageAttribution: null,
      strCreativeCommonsConfirmed: 'No',
      dateModified: '2017-09-07 21:42:09',
    },
    {
      idDrink: '13501',
      strDrink: 'ABC',
      strDrinkAlternate: null,
      strTags: null,
      strVideo: null,
      strCategory: 'Shot',
      strIBA: null,
      strAlcoholic: 'Alcoholic',
      strGlass: 'Shot glass',
      strInstructions: 'Layered in a shot glass.',
      strInstructionsES: 'Coloque todos los ingredientes en un vaso de chupito.',
      strInstructionsDE: 'Schichtaufbau in einem Schnapsglas.',
      strInstructionsFR: null,
      'strInstructionsZH-HANS': null,
      'strInstructionsZH-HANT': null,
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
      strIngredient1: 'Amaretto',
      strIngredient2: 'Baileys irish cream',
      strIngredient3: 'Cognac',
      strIngredient4: null,
      strIngredient5: null,
      strIngredient6: null,
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '1/3 ',
      strMeasure2: '1/3 ',
      strMeasure3: '1/3 ',
      strMeasure4: null,
      strMeasure5: null,
      strMeasure6: null,
      strMeasure7: null,
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strImageSource: null,
      strImageAttribution: null,
      strCreativeCommonsConfirmed: 'No',
      dateModified: '2016-08-31 19:32:08',
    },
  ],
};

describe('Test SearchBarRadios', () => {
  afterEach(() => jest.resetAllMocks());

  it('Test Fist Letter Radio', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
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
      json: jest.fn().mockResolvedValue(drinks),
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
