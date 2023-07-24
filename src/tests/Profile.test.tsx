import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import Provider from '../context/Provider';
import App from '../App';

describe('profile page', () => {
  it('should show the buttons', async () => {
    localStorage.setItem('user', JSON.stringify({ user: 'teste@teste.com' }));
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/profile'] },
    );

    const doneRecipesEl = screen.getByTestId('profile-done-btn');
    const favoriteRecipesEl = screen.getByTestId('profile-favorite-btn');
    const logoutRecipesEl = screen.getByTestId('profile-logout-btn');
    expect(doneRecipesEl).toBeInTheDocument();
    expect(favoriteRecipesEl).toBeInTheDocument();
    expect(logoutRecipesEl).toBeInTheDocument();

    userEvent.click(logoutRecipesEl);

    const emailInput = await screen.findByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    expect(localStorage.getItem('user')).toBeNull();
  });
  it('should show the default email', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/profile'] },
    );
    const emailEl = screen.getByRole('heading', { name: /test@test/i });
    expect(emailEl).toBeInTheDocument();
  });
});
