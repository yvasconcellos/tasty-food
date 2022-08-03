import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Recipes from '../Pages/Recipes';
import MyProvider from '../context/MyProvider';

describe('Componente Header', () => {
  it('verifica se existem dois botões, duas imagens e o title no Header da página Recipies', async () => {
    renderWithRouter(
      <MyProvider>
        <Recipes />
      </MyProvider>
    );

    const buttonProfileEl = screen.getByRole('button', { name: /perfil/i });
    const btnImgProfileEl = screen.getByTestId('profile-top-btn');
    const buttonShearchEl = screen.getByRole('button', { name: /busca/i });
    const btnImgShearchEl = screen.getByTestId('search-top-btn');
    const titleHeaderEl = screen.getByTestId('page-title');

    expect(buttonProfileEl).toBeInTheDocument();
    expect(btnImgProfileEl).toBeInTheDocument();
    expect(buttonShearchEl).toBeInTheDocument();
    expect(btnImgShearchEl).toBeInTheDocument();
    expect(titleHeaderEl).toBeInTheDocument();
  });

  it('verifique se ao clicar no botão de profile é redirecionado para página "/profile"', async () => {
    const { history } = renderWithRouter(
      <MyProvider>
        <Recipes />
      </MyProvider>
    );

    const buttonProfileEl = screen.getByRole('button', { name: /perfil/i });

    userEvent.click(buttonProfileEl);

    expect(buttonProfileEl).toBeInTheDocument();
    await waitFor(() => expect(history.location.pathname).toBe('/profile'));
  });

  it('verifique se ao clicar no botão de Pesquisa é mostrado os campos de Pesquisa e se clicado novamente ele some', () => {
    renderWithRouter(
      <MyProvider>
        <Recipes />
      </MyProvider>
    );

    const buttonShearchEl = screen.getByRole('button', { name: /busca/i });
    userEvent.click(buttonShearchEl);

    const inputSearchFindEl = screen.getByTestId('search-input');
    const inputRadioShearchEl1 = screen.getByTestId('ingredient-search-radio');
    const inputRadioNameEl1 = screen.getByText(/ingredient/i);
    const inputRadioShearchEl2 = screen.getByTestId('name-search-radio');
    const inputRadioNameEl2 = screen.getByText(/name/i);
    const inputRadioShearchEl3 = screen.getByTestId(
      'first-letter-search-radio'
    );
    const inputRadioNameEl3 = screen.getByText(/first letter/i);
    const btnSendSearch = screen.getByTestId('exec-search-btn');

    expect(inputSearchFindEl).toBeInTheDocument();
    expect(inputRadioShearchEl1).toBeInTheDocument();
    expect(inputRadioNameEl1).toBeInTheDocument();
    expect(inputRadioShearchEl2).toBeInTheDocument();
    expect(inputRadioNameEl2).toBeInTheDocument();
    expect(inputRadioShearchEl3).toBeInTheDocument();
    expect(inputRadioNameEl3).toBeInTheDocument();
    expect(btnSendSearch).toBeInTheDocument();

    userEvent.click(buttonShearchEl);

    expect(inputSearchFindEl).not.toBeInTheDocument();
    expect(inputRadioShearchEl1).not.toBeInTheDocument();
    expect(inputRadioNameEl1).not.toBeInTheDocument();
    expect(inputRadioShearchEl2).not.toBeInTheDocument();
    expect(inputRadioNameEl2).not.toBeInTheDocument();
    expect(inputRadioShearchEl3).not.toBeInTheDocument();
    expect(inputRadioNameEl3).not.toBeInTheDocument();
    expect(btnSendSearch).not.toBeInTheDocument();
  });
});
