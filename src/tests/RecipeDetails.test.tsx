import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from './helpers/renderWith';
import RecipeProvider from '../context/RecipeProvider';
import fetchMock from '../../cypress/mocks/fetch.js';
import App from '../App';
import { favoriteRecipesMock } from './mocks/localStorageMocks';

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
      <RecipeProvider>
        <App />
      </RecipeProvider>,
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
      <RecipeProvider>
        <App />
      </RecipeProvider>,
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
      <RecipeProvider>
        <App />
      </RecipeProvider>,
      { initialEntries: [initialEntry] },
    );

    const loading = screen.getByTestId('loading');
    await waitForElementToBeRemoved(loading);

    const favoriteBtn = screen.getByTestId(favoriteBtnTestId);
    expect(favoriteBtn).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
    await userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
    await userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
  });
  it('should show ingredients and measures', async () => {
    renderWithRouter(
      <RecipeProvider>
        <App />
      </RecipeProvider>,
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
      <RecipeProvider>
        <App />
      </RecipeProvider>,
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
      <RecipeProvider>
        <App />
      </RecipeProvider>,
      { initialEntries: ['/drinks/178319'] },
    );

    const loading = screen.getByTestId('loading');
    await waitForElementToBeRemoved(loading);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(favoriteRecipes).toHaveLength(0);

    const favoriteBtn = await screen.findByTestId(favoriteBtnTestId);
    await userEvent.click(favoriteBtn);

    const updatedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    console.log(updatedFavoriteRecipes);
    expect(updatedFavoriteRecipes).toHaveLength(1);
    expect(updatedFavoriteRecipes[0]).toEqual(favoriteRecipesMock[1]);
  });
});
