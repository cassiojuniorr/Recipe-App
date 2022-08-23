import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Test Footer', () => {
  it('Renderiza na Tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');
    expect(screen.getAllByTestId('drinks-bottom-btn')).toBeDefined();
    expect(screen.getAllByTestId('food-bottom-btn')).toBeDefined();
  });
  it('', () => {});
  it('', () => {});
  it('', () => {});
});
