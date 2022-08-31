import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const meals1 = {
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

const id1 = 'search-top-btn';
const id2 = 'search-input';
const id3 = 'exec-search-btn';

describe('Teste SearchBar', () => {
  afterEach(() => jest.resetAllMocks());

  it('Teste Name Radio', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chiken';

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals1),
    });

    history.push('/foods');

    const imgSearch = screen.getByTestId(id1);

    userEvent.click(imgSearch);

    const inputSearch = screen.getByTestId(id2);
    const nameRadio = screen.getByTestId('name-search-radio');

    userEvent.type(inputSearch, 'chiken');
    userEvent.click(nameRadio);
    userEvent.click(screen.getByTestId(id3));
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(endpoint));
  });
  it('Teste erro de pesquisa na tela de comidas', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/foods');

    const imgSearch = screen.getByTestId(id1);

    userEvent.click(imgSearch);

    const inputSearch = screen.getByTestId(id2);
    const nameRadio = screen.getByTestId('name-search-radio');

    userEvent.type(inputSearch, 'asdadaa');
    userEvent.click(nameRadio);
    userEvent.click(screen.getByTestId(id3));
  });
  it('Teste Alert Fist Letter', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/foods');

    const imgSearch = screen.getByTestId(id1);

    userEvent.click(imgSearch);

    const inputSearch = screen.getByTestId(id2);
    const firsLettertRadio = screen.getByTestId('first-letter-search-radio');

    userEvent.type(inputSearch, 'asasdas');
    userEvent.click(firsLettertRadio);
    userEvent.click(screen.getByTestId(id3));
  });
});
