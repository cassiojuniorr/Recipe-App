import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Test SearchBar', () => {
  afterEach(() => jest.resetAllMocks());

  it('Test Name Radio', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chiken';

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(endpoint),
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
