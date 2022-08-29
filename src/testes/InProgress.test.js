import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

Object.assign(navigator, {
  clipboard: {
    writeText: (copy) => {
      console.log(copy);
    },
  },
});

describe('Teste Foods In Progress', () => {
  afterEach(() => localStorage.clear('inProgressRecipes'));

  it('Testando Foods in progress', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    jest.spyOn(navigator.clipboard, 'writeText');

    history.push('/foods/52978/in-progress');

    const titile = await screen.findByTestId('recipe-title');
    const picture = await screen.findByTestId('recipe-photo');
    const shareBtn = await screen.findByTestId('share-btn');
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    const category = await screen.findByTestId('recipe-category');
    const instructions = await screen.findByTestId('instructions');
    const finishBtn = await screen.findByTestId('finish-recipe-btn');

    expect(titile).toBeDefined();
    expect(picture.src).toBe('https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg');

    userEvent.click(shareBtn);
    expect(screen.getByText(/Link copied!/i)).toBeDefined();

    userEvent.click(favoriteBtn);

    expect(await screen.findByTestId('0-ingredient-step')).toBeDefined();
    expect(await screen.findByTestId('1-ingredient-step')).toBeDefined();
    expect(await screen.findByTestId('2-ingredient-step')).toBeDefined();
    expect(await screen.findByTestId('3-ingredient-step')).toBeDefined();
    expect(await screen.findByTestId('4-ingredient-step')).toBeDefined();
    expect(await screen.findByTestId('5-ingredient-step')).toBeDefined();
    const fristBox = await screen.findByTestId('0-check-box');

    userEvent.click(fristBox);
    userEvent.click(fristBox);
    userEvent.click(fristBox);
    userEvent.click(await screen.findByTestId('1-check-box'));
    userEvent.click(await screen.findByTestId('2-check-box'));
    userEvent.click(await screen.findByTestId('3-check-box'));
    userEvent.click(await screen.findByTestId('4-check-box'));
    userEvent.click(await screen.findByTestId('5-check-box'));

    expect(category).toBeDefined();
    expect(instructions).toBeDefined();
    userEvent.click(finishBtn);
  });

  it('Testando Drinks in progress', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    jest.spyOn(navigator.clipboard, 'writeText');

    history.push('/drinks/15997/in-progress');

    const titile = await screen.findByTestId('recipe-title');
    const picture = await screen.findByTestId('recipe-photo');
    const shareBtn = await screen.findByTestId('share-btn');
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    const category = await screen.findByTestId('recipe-category');
    const instructions = await screen.findByTestId('instructions');
    const finishBtn = await screen.findByTestId('finish-recipe-btn');

    expect(titile).toBeDefined();
    expect(picture.src).toBe('https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');

    userEvent.click(shareBtn);
    expect(screen.getByText(/Link copied!/i)).toBeDefined();

    userEvent.click(favoriteBtn);

    expect(await screen.findByTestId('0-ingredient-step')).toBeDefined();
    expect(await screen.findByTestId('1-ingredient-step')).toBeDefined();
    expect(await screen.findByTestId('2-ingredient-step')).toBeDefined();

    userEvent.click(await screen.findByTestId('0-check-box'));
    userEvent.click(await screen.findByTestId('1-check-box'));
    userEvent.click(await screen.findByTestId('2-check-box'));

    expect(category).toBeDefined();
    expect(instructions).toBeDefined();
    userEvent.click(finishBtn);
  });
});
