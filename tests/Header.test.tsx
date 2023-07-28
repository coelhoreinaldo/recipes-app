import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from './helpers/renderWith';
import Meals from '../src/pages/Meals';
import Drinks from '../src/pages/Drinks';
import fetchMock from './mocks/fetch.js';
import Provider from '../src/context/Provider';

describe('header component', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });
  it('should exist on Meals page', () => {
    renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );

    const title = screen.getByRole('heading', { name: /meals/i });
    expect(title).toBeInTheDocument();
  });
  it('should exist on Drinks page', () => {
    renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );

    const title = screen.getByRole('heading', { name: /drinks/i });
    expect(title).toBeInTheDocument();
  });
  it('should show search bar on search button click', async () => {
    renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,

    );

    const searchBtn = screen.getByRole('img', { name: /pesquisar/i });
    userEvent.click(searchBtn);

    expect(await screen.findByTestId(/search-input/i)).toBeInTheDocument();
  });
});
