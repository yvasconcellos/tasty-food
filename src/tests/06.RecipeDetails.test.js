import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyProvider from '../context/MyProvider';
import ProviderRecipe from '../context/ProviderRecipe';

describe('Página de Recipe Details', () => {
  it('Testa se imagem, titulo, categoria, inigredientes, video e recomendações estão na tela da página Recipe Details (food)', async () => {
    renderWithRouter(
      <MyProvider>
        <ProviderRecipe>
          <App />
        </ProviderRecipe>
      </MyProvider>,
      '/foods/52977'
    );

    const imgRecipeEl = await screen.findByTestId('recipe-photo');
    const titileRecipeEl = await screen.findByTestId('recipe-title');
    const btnShareEl = await screen.findByTestId('share-btn');
    const btnFavoriteEl = await screen.findByTestId('favorite-btn');
    const categoryRecipeEl = await screen.findByTestId('recipe-category');
    const ingredientsRecipieEl = await screen.findAllByTestId(
      /ingredient-name-and-measure/i
    );
    const videoRecipieEl = screen.getByTitle(/embedded youtube/i);
    const recomendationsRecipeEls = await screen.findAllByTestId(
      /recomendation-card/i
    );
    const recomendationsTitleEls = await screen.findAllByTestId(
      /recomendation-title/i
    );

    expect(imgRecipeEl).toBeInTheDocument();
    expect(titileRecipeEl).toBeInTheDocument();
    expect(btnShareEl).toBeInTheDocument();
    expect(btnFavoriteEl).toBeInTheDocument();
    expect(categoryRecipeEl).toBeInTheDocument();
    expect(ingredientsRecipieEl.length).toBe(13);
    expect(videoRecipieEl).toBeInTheDocument();
    expect(recomendationsRecipeEls.length).toBe(6);
    expect(recomendationsTitleEls.length).toBe(6);
  });

  it('Testa se o botão Start Recipe redireciona para a página de RecipesInProgress (food)', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <ProviderRecipe>
          <App />
        </ProviderRecipe>
      </MyProvider>,
      '/foods/52977'
    );

    const btnStartRecipe = await screen.findByTestId('start-recipe-btn');

    userEvent.click(btnStartRecipe);

    expect(history.location.pathname).toBe('/foods/52977/in-progress');
  });

  it('Testa se imagem, titulo, categoria, inigredientes, video e recomendações estão na tela da página Recipe Details (drink)', async () => {
    renderWithRouter(
      <MyProvider>
        <ProviderRecipe>
          <App />
        </ProviderRecipe>
      </MyProvider>,
      '/drinks/15997'
    );

    const imgRecipeEl = await screen.findByTestId('recipe-photo');
    const titileRecipeEl = await screen.findByTestId('recipe-title');
    const btnShareEl = await screen.findByTestId('share-btn');
    const btnFavoriteEl = await screen.findByTestId('favorite-btn');
    const categoryRecipeEl = await screen.findByTestId('recipe-category');
    const ingredientsRecipieEl = await screen.findAllByTestId(
      /ingredient-name-and-measure/i
    );
    const recomendationsRecipeEls = await screen.findAllByTestId(
      /recomendation-card/i
    );
    const recomendationsTitleEls = await screen.findAllByTestId(
      /recomendation-title/i
    );

    
    expect(imgRecipeEl).toBeInTheDocument();
    expect(titileRecipeEl).toBeInTheDocument();
    expect(btnShareEl).toBeInTheDocument();
    expect(btnFavoriteEl).toBeInTheDocument();
    expect(categoryRecipeEl).toBeInTheDocument();
    expect(ingredientsRecipieEl.length).toBe(3);
    expect(recomendationsRecipeEls.length).toBe(6);
    expect(recomendationsTitleEls.length).toBe(6);
  });

  it('Testa se o botão Start Recipe redireciona para a página de RecipesInProgress (drink)', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <ProviderRecipe>
          <App />
        </ProviderRecipe>
      </MyProvider>,
      '/drinks/15997'
    );

    const btnStartRecipe = await screen.findByTestId('start-recipe-btn');

    userEvent.click(btnStartRecipe);

    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });
});
