import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import Provider from '../context/Provider';
import App from '../App';

describe('footer component', () => {
  it('should redirect to Drinks page', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/meals'] },
    );

    const drinksBtn = screen.getByTestId('drink-btn-link');
    expect(drinksBtn).toBeInTheDocument();
    await userEvent.click(drinksBtn);

    expect(await screen.findByRole('heading', {
      name: /drinks/i,
    })).toBeInTheDocument();

    const allCategory = screen.getByTestId('All-category-filter');
    expect(allCategory).toBeInTheDocument();
  });
  it('should redirect to Meals page', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/drinks'] },
    );

    const drinksBtn = screen.getByTestId('meal-btn-link');
    expect(drinksBtn).toBeInTheDocument();
    await userEvent.click(drinksBtn);

    expect(await screen.findByRole('heading', {
      name: /meals/i,
    })).toBeInTheDocument();
  });
});
