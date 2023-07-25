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
    <main
      className="h-screen w-full flex flex-col
     justify-center items-center"
    >
      <div
        className="h-1/2 bg-primary w-full text-white
       flex justify-center items-center"
      >
        <h1 className="text-4xl text-center font-bold">Recipes App</h1>

      </div>

      <form
        onSubmit={ handleSubmit }
        className="flex flex-col items-center gap-4 h-1/2 justify-center p-6 w-full"
      >
        <h3 className="text-primary font-bold italic text-lg">LOGIN</h3>
        <label htmlFor="password-input" className="flex flex-col w-full">
          <input
            type="email"
            name="emailInput"
            id="email-input"
            data-testid="email-input"
            placeholder="Email"
            className="border-primary rounded-lg border-2 p-2
            placeholder:text-primary caret-primary outline-blue-400"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="password-input" className="flex flex-col w-full">
          <input
            type="password"
            name="passwordInput"
            id="password-input"
            data-testid="password-input"
            placeholder="Password"
            className="border-primary rounded-lg border-2 p-2
            placeholder:text-primary caret-primary outline-blue-400"
            onChange={ handleChange }
          />
        </label>

        <button
          type="submit"
          data-testid="login-submit-btn"
          className="border-secondary rounded-lg border-2 p-2 w-full text-white
          bg-secondary disabled:bg-gray-200 disabled:text-gray-500 hover:bg-purple
          font-bold"
          disabled={ invalidInputs }
        >
          ENTER
        </button>
      </form>
    </main>
  );
}
