import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Login from '../Pages/Login';
import MyProvider from '../../src/context/MyProvider';

describe('Página de Login', () => {
  it('deve exibir dois inputs e um botão na tela da página Login', () => {
    renderWithRouter(
      <MyProvider>
        <Login />
      </MyProvider>
    );
    const inputEl = screen.getByTestId('email-input');
    const inputPasswordEl = screen.getByTestId('password-input');
    const buttonEl = screen.getByTestId('login-submit-btn');

    expect(inputEl).toBeInTheDocument();
    expect(inputPasswordEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  });

  it('deve possuir um botão desabilitado na tela da página Login', () => {
    renderWithRouter(
      <MyProvider>
        <Login />
      </MyProvider>
    );
    const buttonEl = screen.getByTestId('login-submit-btn');

    expect(buttonEl).toBeDisabled();
  });

  it('deve habilitar o botão "Entrar" ao passar um email e password válidos', () => {
    renderWithRouter(
      <MyProvider>
        <Login />
      </MyProvider>
    );

    const inputEl = screen.getByTestId('email-input');
    const inputPasswordEl = screen.getByTestId('password-input');
    const buttonEl = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEl, 'exemplo@hotmail.com');
    userEvent.type(inputPasswordEl, '1234567');

    expect(buttonEl).not.toBeDisabled();
  });

  it('deve ser redirecionada à página de Foods ao clicar em Entrar', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <Login />
      </MyProvider>
    );

    const inputEl = screen.getByTestId('email-input');
    const inputPasswordEl = screen.getByTestId('password-input');
    const buttonEl = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEl, 'exemplo@hotmail.com');
    userEvent.type(inputPasswordEl, '1234567');

    userEvent.click(buttonEl);

    await waitFor(() => expect(history.location.pathname).toBe('/foods'));
  });

  test('verifica se os dados são salvos no LocalStorage', () => {
    renderWithRouter(
      <MyProvider>
        <Login />
      </MyProvider>
    );

    const inputEl = screen.getByTestId('email-input');
    const inputPasswordEl = screen.getByTestId('password-input');
    const buttonEl = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEl, 'exemplo@hotmail.com');
    userEvent.type(inputPasswordEl, '1234567');
    userEvent.click(buttonEl);

    const keyUserLS = localStorage.getItem('user');
    const keyMealsTokenLS = localStorage.getItem('mealsToken');
    const keyCocktailsToken = localStorage.getItem('cocktailsToken');

    expect(keyUserLS).toEqual('{"email":"exemplo@hotmail.com"}');
    expect(keyMealsTokenLS).toEqual('1');
    expect(keyCocktailsToken).toEqual('1');
  });
});
