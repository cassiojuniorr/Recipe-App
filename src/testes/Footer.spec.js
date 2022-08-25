import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Test Footer', () => {
  it('Renderiza na Tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');
    expect(screen.getByTestId('drinks-bottom-btn')).toBeDefined();
    expect(screen.getByTestId('food-bottom-btn')).toBeDefined();
  });
  it('Usando os links', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');

    const linkDrinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(linkDrinks);
    expect(history.location.pathname).toBe('/drinks');

    const linkFood = screen.getByTestId('food-bottom-btn');
    userEvent.click(linkFood);
    expect(history.location.pathname).toBe('/foods');
  });
});
