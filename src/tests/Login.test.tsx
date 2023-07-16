import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import Login from '../pages/Login';

const email = 'trybe@trybe.com';
const password = '1234567';
const testidEmail = 'email-input';
const testidPassword = 'password-input';

describe('login page', () => {
  it('should have the form elements', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(testidEmail);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId(testidPassword);
    expect(passwordInput).toBeInTheDocument();

    const buttonEnter = screen.getByTestId('login-submit-btn');
    expect(buttonEnter).toBeDisabled();
  });
  it('Deve testar se ao clicar no botão de Entrar, a aplicação é redirecionada para a página Meals, na URL /meals', async () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(testidEmail);
    const passwordInput = screen.getByTestId(testidPassword);
    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);
    const buttonEnter = screen.getByTestId('login-submit-btn');
    expect(buttonEnter).toBeInTheDocument();
    await userEvent.click(buttonEnter);
  });
});
