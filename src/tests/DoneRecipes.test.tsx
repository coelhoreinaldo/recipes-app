import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from './helpers/renderWith';
import Provider from '../context/Provider';
import fetchMock from '../../cypress/mocks/fetch.js';
import App from '../App';
import { doneRecipesMock } from './mocks/localStorageMocks';

const initialEntry = '/done-recipes';

describe('recipe in progress page', () => {
  vi.mock('clipboard-copy');

  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
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
    const pageTitle = screen.getByRole('heading', { name: /done recipes/i });
    const filterAllBtn = screen.getByTestId('filter-by-all-btn');
    const filterMealBtn = screen.getByTestId('filter-by-meal-btn');
    const filterDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    const recipeImg = screen.getByTestId('0-horizontal-image');
    const recipeName = screen.getByTestId('0-horizontal-name');
    const recipeCategory = screen.getByTestId('0-horizontal-top-text');
    const recipeDate = screen.getByTestId('0-horizontal-done-date');

    expect(pageTitle).toBeInTheDocument();
    expect(filterAllBtn).toBeInTheDocument();
    expect(filterMealBtn).toBeInTheDocument();
    expect(filterDrinkBtn).toBeInTheDocument();
    expect(recipeImg).toBeInTheDocument();
    expect(recipeName).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeDate).toBeInTheDocument();
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
});

it('should be empty if there is no done recipes', async () => {
  localStorage.clear();
  renderWithRouter(
    <Provider>
      <App />
    </Provider>,
    { initialEntries: [initialEntry] },
  );
  const emptyMsg = await screen.findByText(/you haven't finished any recipe yet/i);
  expect(emptyMsg).toBeInTheDocument();
});
