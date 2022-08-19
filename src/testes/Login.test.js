import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

// const token = {
//   "response_code":0,
//   "response_message":"Token Generated Successfully!",
//   "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6",
// };

// afterEach((() => jest.clearAllMocks));

describe('Testando o componente <Login />', () => {
  it('Testando o formulario de login', async () => {
    // global.fetch = jest.fn().mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(token),
    // });
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
//   it('Testando o botão de Settings da pagina de login', () => {
//     const { history } = renderWithRouterAndRedux(<App />);
//     expect(history.location.pathname).toBe('/');

//     const buttonSettings = screen.getByRole('button', { name: 'Settings' });
//     expect(buttonSettings).toBeInTheDocument();
//     userEvent.click(buttonSettings);

//     expect(history.location.pathname).toBe('/config');
//   });
});
