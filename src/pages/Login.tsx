import React, { useState } from 'react';

export default function Login() {
  const [userData, setUserData] = useState({
    emailInput: '',
    passwordInput: '',
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <form>
      <label htmlFor="password-input">
        <input
          type="email"
          name="emailInput"
          id="email-input"
          data-testid="email-input"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="password-input">
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
      >
        Enter
      </button>
    </form>
  );
}
