import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';

describe('footer component', () => {
  it('should redirect to Drinks page', async () => {
    renderWithRouter(<Drinks />);

    const drinksBtn = screen.getByTestId('drink-btn-link');
    expect(drinksBtn).toBeInTheDocument();
    userEvent.click(drinksBtn);

    expect(await screen.findByRole('heading', {
      name: /drinks/i,
    })).toBeInTheDocument();
  });
  it('should redirect to Meals page', async () => {
    renderWithRouter(<Meals />);

    const drinksBtn = screen.getByTestId('meal-btn-link');
    expect(drinksBtn).toBeInTheDocument();
    userEvent.click(drinksBtn);

    expect(await screen.findByRole('heading', {
      name: /meals/i,
    })).toBeInTheDocument();
  });
});
