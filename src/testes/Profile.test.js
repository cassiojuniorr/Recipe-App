import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const id = 'profile-top-btn';

describe('Teste da Tela Profile ', () => {
  afterEach(() => jest.resetAllMocks());

  it('Testando os botões', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    localStorage.setItem('user', JSON.stringify({ email: 'alguem@alguem.com' }));

    history.push('/profile');

    expect(screen.getByTestId('profile-email')).toHaveTextContent('alguem@alguem.com');

    const profileButton = screen.getByTestId(id);
    const doneRecipes = screen.getByTestId('profile-done-btn');
    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
    const logout = screen.getByTestId('profile-logout-btn');
    expect(profileButton && doneRecipes && favoriteRecipes && logout).toBeInTheDocument();

    userEvent.click(screen.getByTestId('profile-done-btn'));
    userEvent.click(screen.getByTestId(id));
    userEvent.click(screen.getByTestId('profile-favorite-btn'));
    userEvent.click(screen.getByTestId(id));
    userEvent.click(screen.getByTestId('profile-logout-btn'));

    expect(history.location.pathname).toBe('/');
  });
});
