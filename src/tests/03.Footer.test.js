import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../Pages/Recipes';
import MyProvider from '../context/MyProvider';
import renderWithRouter from './helpers/renderWithRouter';

describe('Componente Footer', () => {
  it('deverá exibir dois botões no Footer da página Recipes', () => {
    renderWithRouter(
      <MyProvider>
        <Recipes />
      </MyProvider>
    );

    const btnFooterDrinks = screen.getByTestId('drinks-bottom-btn');
    const imgBtnDrinks = screen.getByRole('img', { name: /drink icon/i });
    const btnFooterFoods = screen.getByTestId('food-bottom-btn');
    const imgBtnFoods = screen.getByRole('img', { name: /meal icon/i });

    expect(btnFooterDrinks).toBeInTheDocument();
    expect(imgBtnDrinks).toBeInTheDocument();
    expect(btnFooterFoods).toBeInTheDocument();
    expect(imgBtnFoods).toBeInTheDocument();
  });

  it('ao clicar no botão Drinks no Footer da página Recipes deverá ser redirecionada para rota /drinks', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <Recipes />
      </MyProvider>
    );

    const btnFooterDrinks = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(btnFooterDrinks);

    await waitFor(() => expect(history.location.pathname).toBe('/drinks'));
  });

  it('ao clicar no botão Foods no Footer da página Recipes deverá ser redirecionada para rota /foods', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <Recipes />
      </MyProvider>
    );

    const btnFooterFoods = screen.getByTestId('food-bottom-btn');

    userEvent.click(btnFooterFoods);

    await waitFor(() => expect(history.location.pathname).toBe('/foods'));
  });
});
