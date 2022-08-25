import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const drinks1 = {
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

const drinks2 = {
  drinks: [
    {
      idDrink: '15997',
      strDrink: 'GG',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    },
  ],
};

const id1 = 'search-top-btn';
const id2 = 'search-input';
const id3 = 'exec-search-btn';

describe('Test SearchBarRadios', () => {
  afterEach(() => jest.resetAllMocks());

  it('Test Fist Letter Radio', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks1),
    });

    history.push('/drinks');

    const imgSearch = screen.getByTestId(id1);

    userEvent.click(imgSearch);

    const inputSearch = screen.getByTestId(id2);
    const firsLettertRadio = screen.getByTestId('first-letter-search-radio');

    userEvent.type(inputSearch, 'a');
    userEvent.click(firsLettertRadio);
    userEvent.click(screen.getByTestId(id3));
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(endpoint));
  });
  it('Test Ingredient Radio', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin';

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks1),
    });

    history.push('/drinks');

    const imgSearch = screen.getByTestId(id1);

    userEvent.click(imgSearch);

    const inputSearch = screen.getByTestId(id2);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');

    userEvent.type(inputSearch, 'gin');
    userEvent.click(ingredientRadio);
    userEvent.click(screen.getByTestId(id3));
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(endpoint));
  });
  it('Teste erro de pesquisa na tela de bebidas', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/drinks');

    const imgSearch = screen.getByTestId(id1);

    userEvent.click(imgSearch);

    const inputSearch = screen.getByTestId(id2);
    const nameRadio = screen.getByTestId('name-search-radio');

    userEvent.type(inputSearch, 'asdadaa');
    userEvent.click(nameRadio);
    userEvent.click(screen.getByTestId(id3));
  });
  it('Teste redirecionamento da tela de bebidas', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks2),
    });

    history.push('/drinks');

    const imgSearch = screen.getByTestId(id1);

    userEvent.click(imgSearch);

    const inputSearch = screen.getByTestId(id2);
    const nameRadio = screen.getByTestId('name-search-radio');

    userEvent.type(inputSearch, 'GG');
    userEvent.click(nameRadio);
    userEvent.click(screen.getByTestId(id3));
  });
});
