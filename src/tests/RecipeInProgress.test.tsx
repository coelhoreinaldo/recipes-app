import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from './helpers/renderWith';
import Provider from '../context/Provider';
import fetchMock from '../../cypress/mocks/fetch.js';
import App from '../App';
import { doneRecipesMock, recipesInProgressMock } from './mocks/localStorageMocks';

const initialEntry = '/drinks/178319/in-progress';

describe('recipe in progress page', () => {
  vi.mock('clipboard-copy');

  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);
    localStorage.clear();
  });

  it('should show the elements', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: [initialEntry] },
    );

    const mealEl = await screen.findByRole('heading', { name: /aquamarine/i });
    expect(mealEl).toBeInTheDocument();
    const instructions = screen.getByText(/shake well in a shaker with ice\. strain in a martini glass\./i);
    expect(instructions).toBeInTheDocument();
    const image = screen.getByRole('img', { name: /aquamarine/i });
    expect(image).toBeInTheDocument();
    const ingredients = screen.getAllByTestId(/ingredient/i);
    expect(ingredients.length).toBe(3);
    const shareBtn = screen.getByTestId(/share-btn/i);
    expect(shareBtn).toBeInTheDocument();
    const favoriteBtn = screen.getByTestId(/favorite-btn/i);
    expect(favoriteBtn).toBeInTheDocument();
    const finishBtn = screen.getByTestId(/finish-recipe-btn/i);
    expect(finishBtn).toBeInTheDocument();
  });

  it('should save the ingredients in recipes in progress storage', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: [initialEntry] },
    );

    const ingredients = await screen.findAllByTestId(/ingredient/i);
    await userEvent.click(ingredients[0]);
    await userEvent.click(ingredients[1]);
    await userEvent.click(ingredients[2]);

    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    expect(inProgressStorage).toEqual({
      drinks: {
        178319: ['Hpnotiq', 'Pineapple Juice', 'Banana Liqueur'],
      },
      meals: {

      },
    });

    const ingredient0 = await screen.findByRole('checkbox', { name: /hpnotiq/i });
    await userEvent.click(ingredient0);
    expect(ingredient0).not.toBeChecked();
  });

  it('should continue checked ingredients after refresh', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgressMock));
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: [initialEntry] },
    );

    const ingredient0 = await screen.findByRole('checkbox', { name: /hpnotiq/i });
    expect(ingredient0).toBeChecked();
    const ingredient1 = screen.getByRole('checkbox', { name: /pineapple juice/i });
    expect(ingredient1).toBeChecked();
    const ingredient2 = screen.getByRole('checkbox', { name: /banana liqueur/i });
    expect(ingredient2).not.toBeChecked();
  });

  it('should save on done recipes storager after click on finish recipe', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgressMock));

    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: [initialEntry] },
    );

    const finishBtn = await screen.findByTestId(/finish-recipe-btn/i);
    expect(finishBtn).toBeDisabled();
    const ingredient2 = await screen.findByRole('checkbox', { name: /banana liqueur/i });
    await userEvent.click(ingredient2);

    expect(finishBtn).toBeEnabled();
    await userEvent.click(finishBtn);
  });
  it('should redirect to done recipes page after click on finish recipe', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgressMock));
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));

    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/meals/52771/in-progress'] },
    );

    const ingredient7 = await screen.findByRole('checkbox', { name: /basil/i });
    expect(ingredient7).toBeChecked();

    const finishBtn = await screen.findByTestId(/finish-recipe-btn/i);
    expect(finishBtn).toBeEnabled();
    await userEvent.click(finishBtn);

    const doneRecipesTitle = await screen.findByTestId('page-title');
    expect(doneRecipesTitle).toBeInTheDocument();
  });
});
