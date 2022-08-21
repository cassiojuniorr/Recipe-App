import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Test component Header', () => {
  it('Renderiza na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    const imgProfile = screen.getByTestId('profile-top-btn');
    const imgSearch = screen.getByTestId('search-top-btn');

    expect(screen.getByTestId('page-title')).toBeDefined();
    expect(imgProfile).toBeDefined();
    expect(imgSearch).toBeDefined();
  });

  it('Renderiza na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    const imgProfile = screen.getByTestId('profile-top-btn');
    const imgSearch = screen.getByTestId('search-top-btn');

    expect(screen.getByTestId('page-title')).toHaveTextContent(/foods/i);

    userEvent.click(imgSearch);

    expect(screen.getByTestId('search-input')).toBeDefined();

    userEvent.click(imgProfile);

    expect(screen.getByTestId('page-title')).toHaveTextContent(/profile/i);
  });
});
