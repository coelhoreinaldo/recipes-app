import React from 'react';

export default function Login() {
  return (
    <form>
      <label htmlFor="password-input">
        <input
          type="email"
          name="email-input"
          id="email-input"
          data-testid="email-input"
        />
      </label>

      <label htmlFor="password-input">
        <input
          type="password"
          name="password-input"
          id="password-input"
          data-testid="password-input"
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
