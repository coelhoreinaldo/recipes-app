import React from 'react';

export default function SearchBar() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={ handleSubmit } className="w-full flex flex-col items-center">
      <label htmlFor="search-input" className="w-full">
        <input
          type="text"
          data-testid="search-input"
          placeholder="Chicken"
          className="w-full border-primary rounded-lg border-2 p-1
          placeholder:text-primary caret-primary"
        />
      </label>
      <fieldset className="flex justify-around flex-wrap">
        <input
          name="search-input"
          type="radio"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
        />
        <label htmlFor="ingredient-search-radio">Ingredient</label>
        <input
          name="search-input"
          type="radio"
          id="name-search-radio"
          data-testid="name-search-radio"
        />
        <label htmlFor="name-search-radio">Name</label>
        <input
          name="search-input"
          type="radio"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
        />
        <label htmlFor="first-letter-search-radio">FirstLetter</label>
        <button
          className="border-primary rounded-lg border-2 p-1 w-full text-white
        bg-primary disabled:bg-gray-200 disabled:text-gray-500 hover:bg-purple
        font-bold"
          type="submit"
          data-testid="exec-search-btn"
        >
          Search

        </button>
      </fieldset>

    </form>
  );
}
