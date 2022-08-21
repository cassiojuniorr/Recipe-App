import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testando o componente <Login />', () => {
  it('Testando o formulario de login', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByRole('button', { name: 'Enter' });

    expect(inputPassword && inputEmail && buttonEnter).toBeInTheDocument();

    userEvent.type(inputEmail, 'alguem@alguem');
    userEvent.type(inputPassword, '12345');
    expect(buttonEnter).toBeDisabled();

    userEvent.type(inputEmail, '.com');
    userEvent.type(inputPassword, '67');
    userEvent.click(buttonEnter);

    expect(history.location.pathname).toBe('/foods');
  });
});
