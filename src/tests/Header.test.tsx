import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import RecipeProvider from '../context/RecipeProvider';

describe('header component', () => {
  it('should exist on Meals page', () => {
    renderWithRouter(
      <RecipeProvider>
        <Meals />
      </RecipeProvider>,
    );

    const title = screen.getByRole('heading', { name: /meals/i });
    expect(title).toBeInTheDocument();
  });
  it('should exist on Drinks page', () => {
    renderWithRouter(<Drinks />);

    const title = screen.getByRole('heading', { name: /drinks/i });
    expect(title).toBeInTheDocument();
  });
  it('should show search bar on search button click', async () => {
    renderWithRouter(
      <RecipeProvider>
        <Drinks />
      </RecipeProvider>,

    );

    const searchBtn = screen.getByRole('img', { name: /pesquisar/i });
    userEvent.click(searchBtn);

    expect(await screen.findByTestId(/search-input/i)).toBeInTheDocument();
  });
});
