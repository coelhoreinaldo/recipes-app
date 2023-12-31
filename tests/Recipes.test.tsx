import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from './helpers/renderWith';
import Provider from '../src/context/Provider';
import fetchMock from './mocks/fetch.js';
import App from '../src/App';

describe('recipe component', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/meals'] },
    );
  });

  it('should exist on Meals page', async () => {
    const loading = screen.getByTestId('loading');
    await waitForElementToBeRemoved(loading);
    const mealEl = await screen.findByRole('heading', { name: /corba/i });
    expect(mealEl).toBeInTheDocument();
  });

  it('should filter meals by category', async () => {
    const loading = screen.getByTestId('loading');
    await waitForElementToBeRemoved(loading);

    const mealEl = await screen.findByRole('heading', { name: /corba/i });
    const beefCategory = screen.getByTestId('Beef-category-filter');
    expect(mealEl).toBeInTheDocument();
    expect(beefCategory).toBeInTheDocument();

    userEvent.click(beefCategory);

    const loading2 = await screen.findByTestId('loading');
    expect(loading2).toBeInTheDocument();

    const beefEl = await screen.findByRole('heading', { name: /beef and mustard pie/i });
    expect(beefEl).toBeInTheDocument();

    const allBtn = screen.getByTestId('All-category-filter');
    expect(allBtn).toBeInTheDocument();

    userEvent.click(allBtn);
    const mealAllEl = await screen.findByRole('img', { name: /corba/i });
    expect(mealAllEl).toBeInTheDocument();
  });
});

describe('recipe component', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/drinks'] },
    );
  });

  it('should exist on Drinks page', async () => {
    const loading = screen.getByTestId('loading');
    await waitForElementToBeRemoved(loading);
    const drinkEl = await screen.findByRole('link', { name: /gg gg/i });
    expect(drinkEl).toBeInTheDocument();
  });

  it('should filter drinks by category', async () => {
    const loading = screen.getByTestId('loading');
    await waitForElementToBeRemoved(loading);

    const drinkEl = await screen.findByRole('link', { name: /gg gg/i });
    const ordinaryCategory = screen.getByTestId('Ordinary Drink-category-filter');
    expect(drinkEl).toBeInTheDocument();
    expect(ordinaryCategory).toBeInTheDocument();

    userEvent.click(ordinaryCategory);

    const loading2 = await screen.findByTestId('loading');
    expect(loading2).toBeInTheDocument();

    const ordinaryDrinkEl = await screen.findByRole('heading', { name: /mile long island iced tea/i });
    expect(ordinaryDrinkEl).toBeInTheDocument();
  });
});
