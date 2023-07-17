import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from './helpers/renderWith';
import RecipeProvider from '../context/RecipeProvider';
import fetchMock from '../../cypress/mocks/fetch.js';
import App from '../App';

console.log(fetchMock);
describe('recipe component', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });
  it('should exist on Meals page', async () => {
    renderWithRouter(
      <RecipeProvider>
        <App />
      </RecipeProvider>,
      { initialEntries: ['/meals'] },
    );

    const loading = screen.getByTestId('loading');
    expect(loading).toBeInTheDocument();
    const title = await screen.findByRole('heading', { name: /corba/i });
    expect(title).toBeInTheDocument();
  });
});
