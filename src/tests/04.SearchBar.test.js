import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Recipes from '../Pages/Recipes';
import MyProvider from '../context/MyProvider';
import fetch from '../../cypress/mocks/fetch';
// import { wait } from '@testing-library/user-event/dist/utils';

describe('Testa a barra de pesquisa da página Recipes', () => {
  afterEach(() => jest.clearAllMocks());

  it('testa o alerta quando o input tiver mais de um caracter e o radio selecionado for First Letter', async () => {
    renderWithRouter(
      <MyProvider>
        <Recipes />
      </MyProvider>
    );

    global.alert = jest.fn((mensage) => mensage);

    const buttonShearchEl = screen.getByTestId('search-top-btn');
    userEvent.click(buttonShearchEl);

    const inputSearchFindEl = screen.getByTestId('search-input');
    userEvent.type(inputSearchFindEl, 'egg');

    const inputRadioShearchEl3 = screen.getByTestId(
      'first-letter-search-radio'
    );
    userEvent.click(inputRadioShearchEl3);

    const btnSendSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSendSearch);

    await waitFor(() =>
      expect(global.alert).toHaveBeenCalledWith(
        'Your search must have only 1 (one) character'
      )
    );
  });

  it('testa o alerta quando o nenhum resiltado é encontrado', async () => {
    renderWithRouter(
      <MyProvider>
        <Recipes />
      </MyProvider>
    );

    global.alert = jest.fn((mensage) => mensage);

    const buttonShearchEl = screen.getByTestId('search-top-btn');
    userEvent.click(buttonShearchEl);

    const inputSearchFindEl = screen.getByTestId('search-input');
    userEvent.type(inputSearchFindEl, 'xxx');

    const inputRadioShearchEl2 = screen.getByTestId('name-search-radio');
    userEvent.click(inputRadioShearchEl2);

    const btnSendSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSendSearch);

    await waitFor(() =>
      expect(global.alert).toHaveBeenCalledWith(
        "Sorry, we haven't found any recipes for these filters."
      )
    );
  });

  it('testa o botão de pesquisa com o ingrediente egg', () => {
    renderWithRouter(
      <MyProvider>
        <Recipes />
      </MyProvider>
    );

    const buttonShearchEl = screen.getByTestId('search-top-btn');
    userEvent.click(buttonShearchEl);

    const inputSearchFindEl = screen.getByTestId('search-input');
    userEvent.type(inputSearchFindEl, 'egg');

    const inputRadioShearchEl1 = screen.getByTestId('ingredient-search-radio');
    userEvent.click(inputRadioShearchEl1);

    const btnSendSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSendSearch);

    // await waitFor(
    //   () => {
    //     const imgBeefLoMein = screen.getByRole('img', {
    //       name: /beef lo mein/i
    //     });
    //     expect(imgBeefLoMein).toBeInTheDocument();
    //   },
    //   { timeout: 1000, interval: 100 }
    // );
  });

  it('testa o botão de pesquisa com o Nome timbits', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <Recipes />
      </MyProvider>
    );

    const buttonShearchEl = screen.getByTestId('search-top-btn');
    userEvent.click(buttonShearchEl);

    const inputSearchFindEl = screen.getByTestId('search-input');
    userEvent.type(inputSearchFindEl, 'timbits');

    const inputRadioShearchEl2 = screen.getByTestId('name-search-radio');
    userEvent.click(inputRadioShearchEl2);

    const btnSendSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSendSearch);

    await waitFor(
      () => {
        expect(history.location.pathname).toBe('/foods/52929');
      },
      { timeout: 3000 }
    );
  });

  it('testa todos os radio buttons do campo de pesquisa', () => {
    renderWithRouter(
      <MyProvider>
        <Recipes />
      </MyProvider>
    );

    const buttonShearchEl = screen.getByTestId('search-top-btn');
    userEvent.click(buttonShearchEl);

    const inputSearchFindEl = screen.getByTestId('search-input');
    const inputRadioShearchEl1 = screen.getByTestId('ingredient-search-radio');
    const inputRadioShearchEl2 = screen.getByTestId('name-search-radio');
    const inputRadioShearchEl3 = screen.getByTestId(
      'first-letter-search-radio'
    );
    const btnSendSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearchFindEl, 'egg');
    userEvent.click(inputRadioShearchEl1);
    userEvent.click(btnSendSearch);

    userEvent.click(inputRadioShearchEl2);
    userEvent.click(btnSendSearch);

    userEvent.type(inputSearchFindEl, 'a');
    userEvent.click(inputRadioShearchEl3);
    userEvent.click(btnSendSearch);
  });
});
