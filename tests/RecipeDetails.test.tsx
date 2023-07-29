import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from './helpers/renderWith';
import Provider from '../src/context/Provider';
import fetchMock from './mocks/fetch';
import App from '../src/App';
import { favoriteRecipesMock, recipesInProgressMock } from './localStorageMocks/localStorageMocks';

const initialEntry = '/meals/52771';
const favoriteBtnTestId = 'favorite-btn';

describe('recipe details page', () => {
  vi.mock('clipboard-copy');

  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);
    localStorage.clear();
  });

  it('should show image, name and instructions', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: [initialEntry] },
    );

    const loading = screen.getByTestId('loading');
    expect(loading).toBeInTheDocument();
    const mealEl = await screen.findByRole('heading', { name: /spicy arrabiata penne/i });
    expect(mealEl).toBeInTheDocument();
    const instructions = await screen.findByText(/bring a large pot of water to a boil/i);
    expect(instructions).toBeInTheDocument();
    const image = await screen.findByRole('img', { name: /spicy arrabiata penne/i });
    expect(image).toBeInTheDocument();
  });
  it('should copy the recipe\'s link on share button click', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: [initialEntry] },
    );

    const loading = screen.getByTestId('loading');
    await waitForElementToBeRemoved(loading);

    const shareButton = screen.getByTestId('share-btn');

    userEvent.click(shareButton);
    const linkCopied = await screen.findByText(/link copied!/i);
    expect(linkCopied).toBeInTheDocument();
  });
  it('should favorite recipe on favorite button click', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: [initialEntry] },
    );

    const loading = screen.getByTestId('loading');
    await waitForElementToBeRemoved(loading);

    const favoriteBtn = screen.getByTestId(favoriteBtnTestId);
    expect(favoriteBtn).toHaveAttribute('src', '/recipes-app/src/assets/whiteHeartIcon.svg');
    await userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', '/recipes-app/src/assets/blackHeartIcon.svg');
    await userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', '/recipes-app/src/assets/whiteHeartIcon.svg');
  });
  it('should show ingredients and measures', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: [initialEntry] },
    );

    const loading = screen.getByTestId('loading');
    await waitForElementToBeRemoved(loading);

    const ingredients = await screen.findByText(/penne rigate/i);
    expect(ingredients).toBeInTheDocument();
    const measures = await screen.findByText(/1 pound/i);
    expect(measures).toBeInTheDocument();
  });
  it('should save meal recipe on favorite storage', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: [initialEntry] },
    );

    const loading = screen.getByTestId('loading');
    await waitForElementToBeRemoved(loading);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(favoriteRecipes).toHaveLength(0);

    const favoriteBtn = screen.getByTestId(favoriteBtnTestId);
    await userEvent.click(favoriteBtn);

    const updatedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(updatedFavoriteRecipes).toHaveLength(1);
    expect(updatedFavoriteRecipes[0]).toEqual(favoriteRecipesMock[0]);
  });
  it('should save drink recipe on favorite storage', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/drinks/178319'] },
    );

    const loading = screen.getByTestId('loading');
    await waitForElementToBeRemoved(loading);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(favoriteRecipes).toHaveLength(0);

    const favoriteBtn = await screen.findByTestId(favoriteBtnTestId);
    await userEvent.click(favoriteBtn);

    const updatedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(updatedFavoriteRecipes).toHaveLength(1);
    expect(updatedFavoriteRecipes[0]).toEqual(favoriteRecipesMock[1]);
  });
  it('should show "continue recipe" instead if recipe is in progress', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgressMock));
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/drinks/178319'] },
    );

    const loading = screen.getByTestId('loading');
    await waitForElementToBeRemoved(loading);

    const continueRecipeBtn = await screen.findByText(/continue recipe/i);
    expect(continueRecipeBtn).toBeInTheDocument();

    await userEvent.click(continueRecipeBtn);

    const finishRecipeBtn = await screen.findByText(/finish recipe/i);
    expect(finishRecipeBtn).toBeInTheDocument();
  });
});
