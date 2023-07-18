import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeProvider';
import useFetch from '../hooks/useFetch';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchTag, setSearchTag] = useState<string>('');

  const { setFilteredMeals, setFilteredDrinks } = useContext(RecipeContext);
  const { pathname } = useLocation();
  const { fetchApi } = useFetch();

  const handleSearchInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (searchTag === 'firstLetter' && value.length > 1) {
      return window.alert('Your search must have only 1 (one) character');
    }
    return setSearchInput(value);
  };

  const handleSearchTag = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput('');
    return setSearchTag(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pathname === '/meals') {
      const tags = {
        ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`,
        name: `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`,
        firstLetter: `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`,
      };
      const data = await fetchApi(tags[searchTag as keyof typeof tags]);
      return setFilteredMeals(data.meals.slice(0, 12));
    }
    const tags = {
      ingredient: `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${searchInput}`,
      name: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`,
      firstLetter: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`,
    };
    const data = await fetchApi(tags[searchTag as keyof typeof tags]);
    return setFilteredDrinks(data.drinks.slice(0, 12));
  };

  return (
    <form onSubmit={ handleSubmit } className="w-full flex flex-col items-center">
      <label htmlFor="search-input" className="w-full">
        <input
          type="text"
          data-testid="search-input"
          placeholder="Chicken"
          name="searchInput"
          value={ searchInput }
          onChange={ handleSearchInput }
          className="w-full border-primary rounded-lg border-2 p-1
          placeholder:text-primary caret-primary"
        />
      </label>
      <fieldset className="flex justify-around flex-wrap">
        <input
          name="searchTag"
          type="radio"
          id="ingredient-search-radio"
          value="ingredient"
          checked={ searchTag === 'ingredient' }
          onChange={ handleSearchTag }
          data-testid="ingredient-search-radio"
        />
        <label htmlFor="ingredient-search-radio">Ingredient</label>
        <input
          name="searchTag"
          type="radio"
          id="name-search-radio"
          value="name"
          checked={ searchTag === 'name' }
          onChange={ handleSearchTag }
          data-testid="name-search-radio"
        />
        <label htmlFor="name-search-radio">Name</label>
        <input
          name="searchTag"
          type="radio"
          id="first-letter-search-radio"
          value="firstLetter"
          checked={ searchTag === 'firstLetter' }
          onChange={ handleSearchTag }
          data-testid="first-letter-search-radio"
        />
        <label htmlFor="first-letter-search-radio">First Letter</label>
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
