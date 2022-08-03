import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../Pages/Profile';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import MyProvider from '../context/MyProvider';

describe('Página de Profile', () => {
  it('testa se o email não aparece na página de Profile', () => {
    renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>,
      '/profile'
    );

    const buttonProfileEl = screen.getByRole('button', { name: /perfil/i });
    expect(buttonProfileEl).toBeInTheDocument();

    const emailUserEl = screen.getByTestId('profile-email');
    expect(emailUserEl).toBeInTheDocument();
  });

  it('testa se o email aparece na página de Profile', () => {
    localStorage.setItem(
      'user',
      JSON.stringify({ email: 'exemplo@hotmail.com' })
    );

    renderWithRouter(
      <MyProvider>
        <App />
      </MyProvider>
    );

    const inputEl = screen.getByTestId('email-input');
    const inputPasswordEl = screen.getByTestId('password-input');
    const buttonEl = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEl, 'exemplo@hotmail.com');
    userEvent.type(inputPasswordEl, '1234567');
    userEvent.click(buttonEl);

    const buttonProfileEl = screen.getByRole('button', { name: /perfil/i });
    userEvent.click(buttonProfileEl);

    const emailUserEl = screen.getByTestId('profile-email');

    expect(emailUserEl).toBeInTheDocument();
  });

  it('testa se exibe três botões na página Profile', () => {
    renderWithRouter(
      <MyProvider>
        <Profile />
      </MyProvider>
    );

    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    const btnLogout = screen.getByTestId('profile-logout-btn');

    expect(btnDoneRecipes).toBeInTheDocument();
    expect(btnFavoriteRecipes).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
  });

  it('testa se ao clicar no botão Done Recipes é redirecionado para a rota respectiva', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <Profile />
      </MyProvider>
    );

    const btnDoneRecipes = screen.getByTestId('profile-done-btn');

    userEvent.click(btnDoneRecipes);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('testa se ao clicar no botão Favorite Recipes é redirecionado para a rota respectiva', () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <Profile />
      </MyProvider>
    );

    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');

    userEvent.click(btnFavoriteRecipes);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('testa se ao clicar no botão Logout é redirecionado para a rota respectiva', () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <Profile />
      </MyProvider>
    );

    const btnLogout = screen.getByTestId('profile-logout-btn');

    userEvent.click(btnLogout);

    expect(history.location.pathname).toBe('/');
  });
});
