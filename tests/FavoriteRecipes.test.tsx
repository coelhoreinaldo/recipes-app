import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from './helpers/renderWith';
import Provider from '../src/context/Provider';
import fetchMock from './mocks/fetch.js';
import App from '../src/App';
import { favoriteRecipesMock } from './localStorageMocks/localStorageMocks';

const initialEntry = '/favorite-recipes';

describe('favorite recipes page', () => {
  vi.mock('clipboard-copy');

  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: [initialEntry] },
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should show the elements', async () => {
    const pageTitle = screen.getByRole('heading', { name: /favorites/i });
    const filterAllBtn = screen.getByTestId('filter-by-all-btn');
    const filterMealBtn = screen.getByTestId('filter-by-meal-btn');
    const filterDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    const recipeImg = screen.getByTestId('0-horizontal-image');
    const recipeName = screen.getByTestId('0-horizontal-name');
    const recipeCategory = screen.getByTestId('0-horizontal-top-text');
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');

    expect(pageTitle).toBeInTheDocument();
    expect(filterAllBtn).toBeInTheDocument();
    expect(filterMealBtn).toBeInTheDocument();
    expect(filterDrinkBtn).toBeInTheDocument();
    expect(recipeImg).toBeInTheDocument();
    expect(recipeName).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
  });

  it('should filter by meal', async () => {
    const drinkEl = screen.getByRole('img', { name: /aquamarine/i });
    expect(drinkEl).toBeInTheDocument();

    const filterByMealBtn = screen.getByTestId('filter-by-meal-btn');
    await userEvent.click(filterByMealBtn);

    const drinkElAfterClick = screen.queryByRole('img', { name: /aquamarine/i });
    expect(drinkElAfterClick).not.toBeInTheDocument();

    const mealEl = screen.getByRole('img', { name: /spicy arrabiata penne/i });
    expect(mealEl).toBeInTheDocument();
  });

  it('should filter by all', async () => {
    const mealEl = screen.getByRole('img', { name: /spicy arrabiata penne/i });
    expect(mealEl).toBeInTheDocument();

    const filterByMealBtn = screen.getByTestId('filter-by-drink-btn');
    await userEvent.click(filterByMealBtn);

    const mealElAfterClick = screen.queryByRole('img', { name: /spicy arrabiata penne/i });
    expect(mealElAfterClick).not.toBeInTheDocument();

    const filterByAllBtn = screen.getByTestId('filter-by-all-btn');
    await userEvent.click(filterByAllBtn);

    const mealElAfterClickAll = screen.getByRole('img', { name: /spicy arrabiata penne/i });
    expect(mealElAfterClickAll).toBeInTheDocument();
  });

  it('should dislike a recipe after favorite btn click', async () => {
    const mealEl = screen.getByRole('img', { name: /spicy arrabiata penne/i });
    expect(mealEl).toBeInTheDocument();

    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    await userEvent.click(favoriteBtn);

    const mealElAfterClick = screen.queryByRole('img', { name: /spicy arrabiata penne/i });
    expect(mealElAfterClick).not.toBeInTheDocument();
  });
});

it('should be empty if there is no favorite recipes', async () => {
  localStorage.clear();
  renderWithRouter(
    <Provider>
      <App />
    </Provider>,
    { initialEntries: [initialEntry] },
  );
  const emptyMsg = await screen.findByText(/you don't have any favorite recipe yet/i);
  expect(emptyMsg).toBeInTheDocument();
});
