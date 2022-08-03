import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyProvider from '../context/MyProvider';
import ProviderRecipe from '../context/ProviderRecipe';

describe('Página de Favorite Recipes', () => {
  beforeEach(() => {
    localStorage.removeItem('favoriteRecipes');
  });

  it('Testa se o card não foi favoritado', async () => {
    renderWithRouter(
      <MyProvider>
        <ProviderRecipe>
          <App />
        </ProviderRecipe>
      </MyProvider>,
      '/favorite-recipes'
    );

    const favoriteCardEl = await screen.findByTestId('0-recipe-card');

    expect(favoriteCardEl).toBeInTheDocument();
  });

  it('Testa se o card foi favoritado', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <ProviderRecipe>
          <App />
        </ProviderRecipe>
      </MyProvider>,
      '/foods/52977'
    );

    const btnFavoriteEl = await screen.findByTestId('favorite-btn');
    userEvent.click(btnFavoriteEl);

    history.push('/foods/53060');

    const btnFavorite1El = await screen.findByTestId('favorite-btn');
    userEvent.click(btnFavorite1El);

    history.push('/drinks/15997');

    const btnFavorite2El = await screen.findByTestId('favorite-btn');
    userEvent.click(btnFavorite2El);

    history.push('/favorite-recipes');

    const favoriteCardsEl = await screen.findAllByTestId(/receitas-cards/i);

    expect(favoriteCardsEl.length).toBe(3);
  });

  it('Testa se ao clicar no filtro Food é renderizado dois elementos', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <ProviderRecipe>
          <App />
        </ProviderRecipe>
      </MyProvider>,
      '/foods/52977'
    );

    const btnFavoriteEl = await screen.findByTestId('favorite-btn');
    userEvent.click(btnFavoriteEl);

    history.push('/foods/53060');

    const btnFavorite1El = await screen.findByTestId('favorite-btn');
    userEvent.click(btnFavorite1El);

    history.push('/drinks/15997');

    const btnFavorite2El = await screen.findByTestId('favorite-btn');
    userEvent.click(btnFavorite2El);

    history.push('/favorite-recipes');

    const btnFoodsFilterEl = await screen.findByTestId('filter-by-food-btn');
    userEvent.click(btnFoodsFilterEl);
    const favoriteCards1El = await screen.findAllByTestId(/receitas-cards/i);
    
    expect(favoriteCards1El.length).toBe(2);
  });

  it('Testa se ao clicar no filtro Drink é renderizado um elemento', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <ProviderRecipe>
          <App />
        </ProviderRecipe>
      </MyProvider>,
      '/foods/52977'
    );

    const btnFavoriteEl = await screen.findByTestId('favorite-btn');
    userEvent.click(btnFavoriteEl);

    history.push('/foods/53060');

    const btnFavorite1El = await screen.findByTestId('favorite-btn');
    userEvent.click(btnFavorite1El);

    history.push('/drinks/15997');

    const btnFavorite2El = await screen.findByTestId('favorite-btn');
    userEvent.click(btnFavorite2El);

    history.push('/favorite-recipes');

    const btnDrinksFilterEl = await screen.findByTestId('filter-by-drink-btn');
    userEvent.click(btnDrinksFilterEl);
    const favoriteCards2El = await screen.findAllByTestId(/receitas-cards/i);

    expect(favoriteCards2El.length).toBe(1);
  });

  it('Testa se ao clicar no filtro All é renderizado dois elementos', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <ProviderRecipe>
          <App />
        </ProviderRecipe>
      </MyProvider>,
      '/foods/52977'
    );

    const btnFavoriteEl = await screen.findByTestId('favorite-btn');
    userEvent.click(btnFavoriteEl);

    history.push('/foods/53060');

    const btnFavorite1El = await screen.findByTestId('favorite-btn');
    userEvent.click(btnFavorite1El);

    history.push('/drinks/15997');

    const btnFavorite2El = await screen.findByTestId('favorite-btn');
    userEvent.click(btnFavorite2El);

    history.push('/favorite-recipes');

    const btnAllEl = await screen.findByTestId('filter-by-all-btn');
    userEvent.click(btnAllEl);
    const favoriteCards3El = await screen.findAllByTestId(/receitas-cards/i);

    expect(favoriteCards3El.length).toBe(3);
  });
});
