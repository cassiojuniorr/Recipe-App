import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const meals = {
  meals: [
    {
      idMeal: '52768',
      strMeal: 'Apple Frangipan Tart',
      strDrinkAlternate: null,
      strCategory: 'Dessert',
      strArea: 'British',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
      strTags: 'Tart,Baking,Fruity',
      strYoutube: 'https://www.youtube.com/watch?v=rp8Slv4INLk',
      strIngredient1: 'digestive biscuits',
      strIngredient2: 'butter',
      strIngredient3: 'Bramley apples',
      strIngredient4: 'butter, softened',
      strIngredient5: 'caster sugar',
      strIngredient6: 'free-range eggs, beaten',
      strIngredient7: 'ground almonds',
      strIngredient8: 'almond extract',
      strIngredient9: 'flaked almonds',
      strIngredient10: '',
      strIngredient11: '',
      strIngredient12: '',
      strIngredient13: '',
      strIngredient14: '',
      strIngredient15: '',
      strIngredient16: null,
      strIngredient17: null,
      strIngredient18: null,
      strIngredient19: null,
      strIngredient20: null,
      strMeasure1: '175g/6oz',
      strMeasure2: '75g/3oz',
      strMeasure3: '200g/7oz',
      strMeasure4: '75g/3oz',
      strMeasure5: '75g/3oz',
      strMeasure6: '2',
      strMeasure7: '75g/3oz',
      strMeasure8: '1 tsp',
      strMeasure9: '50g/1¾oz',
      strMeasure10: '',
      strMeasure11: '',
      strMeasure12: '',
      strMeasure13: '',
      strMeasure14: '',
      strMeasure15: '',
      strMeasure16: null,
      strMeasure17: null,
      strMeasure18: null,
      strMeasure19: null,
      strMeasure20: null,
      strSource: null,
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    },
    {
      idMeal: '52893',
      strMeal: 'Apple & Blackberry Crumble',
      strDrinkAlternate: null,
      strCategory: 'Dessert',
      strArea: 'British',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg',
      strTags: 'Pudding',
      strYoutube: 'https://www.youtube.com/watch?v=4vhcOwVBDO4',
      strIngredient1: 'Plain Flour',
      strIngredient2: 'Caster Sugar',
      strIngredient3: 'Butter',
      strIngredient4: 'Braeburn Apples',
      strIngredient5: 'Butter',
      strIngredient6: 'Demerara Sugar',
      strIngredient7: 'Blackberrys',
      strIngredient8: 'Cinnamon',
      strIngredient9: 'Ice Cream',
      strIngredient10: '',
      strIngredient11: '',
      strIngredient12: '',
      strIngredient13: '',
      strIngredient14: '',
      strIngredient15: '',
      strIngredient16: '',
      strIngredient17: '',
      strIngredient18: '',
      strIngredient19: '',
      strIngredient20: '',
      strMeasure1: '120g',
      strMeasure2: '60g',
      strMeasure3: '60g',
      strMeasure4: '300g',
      strMeasure5: '30g',
      strMeasure6: '30g',
      strMeasure7: '120g',
      strMeasure8: '¼ teaspoon',
      strMeasure9: 'to serve',
      strMeasure10: '',
      strMeasure11: '',
      strMeasure12: '',
      strMeasure13: '',
      strMeasure14: '',
      strMeasure15: '',
      strMeasure16: '',
      strMeasure17: '',
      strMeasure18: '',
      strMeasure19: '',
      strMeasure20: '',
      strSource: 'https://www.bbcgoodfood.com/recipes/778642/apple-and-blackberry-crumble',
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    },
  ],
};

describe('Test SearchBar', () => {
  afterEach(() => jest.resetAllMocks());

  it('Test Name Radio', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chiken';

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });

    history.push('/foods');

    const imgSearch = screen.getByTestId('search-top-btn');

    userEvent.click(imgSearch);

    const inputSearch = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');

    userEvent.type(inputSearch, 'chiken');
    userEvent.click(nameRadio);
    userEvent.click(screen.getByTestId('exec-search-btn'));
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(endpoint));
  });
  it('Test Alert Fist Letter', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/foods');

    const imgSearch = screen.getByTestId('search-top-btn');

    userEvent.click(imgSearch);

    const inputSearch = screen.getByTestId('search-input');
    const firsLettertRadio = screen.getByTestId('first-letter-search-radio');

    userEvent.type(inputSearch, 'asasdas');
    userEvent.click(firsLettertRadio);
    userEvent.click(screen.getByTestId('exec-search-btn'));
  });
});
