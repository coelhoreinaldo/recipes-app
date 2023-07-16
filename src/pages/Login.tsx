import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [userData, setUserData] = useState({
    emailInput: '',
    passwordInput: '',
  });
  const { emailInput, passwordInput } = userData;
  const [invalidInputs, setInvalidInputs] = useState(true);
  const navigate = useNavigate();

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    localStorage.setItem('user', JSON.stringify({ email: emailInput }));
    navigate('/meals');
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput) || passwordInput.length <= 6) {
      return setInvalidInputs(true);
    }
    return setInvalidInputs(false);
  }, [emailInput, passwordInput]);

  return (
    <form
      onSubmit={ handleSubmit }
      className="flex flex-col items-center bg-red-400 w-64 gap-4"
    >
      <label htmlFor="password-input" className="flex flex-col">
        Email
        <input
          type="email"
          name="emailInput"
          id="email-input"
          data-testid="email-input"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="password-input" className="flex flex-col">
        Senha
        <input
          type="password"
          name="passwordInput"
          id="password-input"
          data-testid="password-input"
          onChange={ handleChange }
        />
      </label>

      <button
        type="submit"
        data-testid="login-submit-btn"
        className="bg-blue-400 border-lime-400 border-4 disabled:bg-gray-200"
        disabled={ invalidInputs }
      >
        Enter
      </button>
    </form>
  );
}
