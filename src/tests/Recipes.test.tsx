import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from './helpers/renderWith';
import Provider from '../context/Provider';
import fetchMock from '../../cypress/mocks/fetch.js';
import App from '../App';

describe('recipe component', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });
  it('should exist on Meals page', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/meals'] },
    );

    const loading = screen.getByTestId('loading');
    expect(loading).toBeInTheDocument();
    const mealEl = await screen.findByRole('heading', { name: /corba/i });
    expect(mealEl).toBeInTheDocument();
  });
  it('should filter meals by category', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/meals'] },
    );

    const loading = screen.getByTestId('loading');
    expect(loading).toBeInTheDocument();

    const mealEl = await screen.findByRole('heading', { name: /corba/i });
    const beefCategory = screen.getByRole('button', { name: /beef/i });
    expect(mealEl).toBeInTheDocument();
    expect(beefCategory).toBeInTheDocument();

    userEvent.click(beefCategory);

    const loading2 = await screen.findByTestId('loading');
    expect(loading2).toBeInTheDocument();

    const beefEl = await screen.findByRole('heading', { name: /beef and mustard pie/i });
    expect(beefEl).toBeInTheDocument();

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();

    userEvent.click(allBtn);
    const mealAllEl = await screen.findByRole('img', { name: /corba/i });
    expect(mealAllEl).toBeInTheDocument();
  });
  it('should filter drinks by category', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/drinks'] },
    );

    const loading = screen.getByTestId('loading');
    expect(loading).toBeInTheDocument();

    const drinkEl = await screen.findByRole('link', { name: /gg gg/i });
    const ordinaryCategory = screen.getByRole('button', { name: /ordinary drink/i });
    expect(drinkEl).toBeInTheDocument();
    expect(ordinaryCategory).toBeInTheDocument();

    userEvent.click(ordinaryCategory);

    const loading2 = await screen.findByTestId('loading');
    expect(loading2).toBeInTheDocument();

    const ordinaryDrinkEl = await screen.findByRole('heading', { name: /mile long island iced tea/i });
    expect(ordinaryDrinkEl).toBeInTheDocument();
  });
});
