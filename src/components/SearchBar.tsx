import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeProvider';
import useFetch from '../hooks/useFetch';
import { getApiInfo } from '../utils/apiFunctions';
import Button from './Buttons/Button';

const bgAndBorder = 'bg-primary border-primary';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchTag, setSearchTag] = useState<string>('ingredient');
  const navigate = useNavigate();

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
    return setSearchTag(value);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const isMealsPage = pathname === '/meals';
    const { recipeApi, recipeType, recipeId } = getApiInfo(pathname);
    const tags = {
      ingredient: `https://www.the${recipeApi}db.com/api/json/v1/1/filter.php?i=${searchInput}`,
      name: `https://www.the${recipeApi}db.com/api/json/v1/1/search.php?s=${searchInput}`,
      firstLetter: `https://www.the${recipeApi}db.com/api/json/v1/1/search.php?f=${searchInput}`,
    };
    const data = await fetchApi(tags[searchTag as keyof typeof tags]);
    setSearchInput('');
    if (!data[recipeType]) {
      return window.alert("Sorry, we haven't found any recipes for these filters.");
    }
    if (data[recipeType].length === 1) {
      return navigate(`/${recipeType}/${data[recipeType][0][recipeId]}`);
    }
    return isMealsPage ? setFilteredMeals(data[recipeType].slice(0, 12))
      : setFilteredDrinks(data[recipeType].slice(0, 12));
  };

  return (
    <form className="w-full flex flex-col items-center mt-2">
      <label htmlFor="search-input" className="w-full">
        <input
          type="text"
          data-testid="search-input"
          placeholder={ pathname === '/meals' ? 'Chicken...' : 'Vodka...' }
          name="searchInput"
          value={ searchInput }
          onChange={ handleSearchInput }
          className="w-full border-primary rounded-lg border-2 p-1
          placeholder:text-primary caret-primary outline-purple"
        />
      </label>
      <fieldset className="flex justify-between flex-wrap mt-2">
        <label
          htmlFor="ingredient-search-radio"
          className="inline-flex items-center cursor-pointer"
        >
          <input
            name="searchTag"
            type="radio"
            id="ingredient-search-radio"
            value="ingredient"
            checked={ searchTag === 'ingredient' }
            onChange={ handleSearchTag }
            className="hidden"
          />
          <span
            data-testid="ingredient-search-radio"
            className={ `w-4 h-4 inline-block rounded-full 
            border border-purple transition-all duration-700
             ${searchTag === 'ingredient' ? bgAndBorder : ''}` }
          />
          <span className="ml-2">Ingredient</span>
        </label>

        <label
          htmlFor="name-search-radio"
          className="inline-flex items-center cursor-pointer"
        >
          <input
            name="searchTag"
            type="radio"
            id="name-search-radio"
            value="name"
            checked={ searchTag === 'name' }
            onChange={ handleSearchTag }
            className="hidden"
          />
          <span
            data-testid="name-search-radio"
            className={ `w-4 h-4 inline-block rounded-full border border-purple 
            transition-all duration-700 ${searchTag === 'name' ? bgAndBorder : ''}` }
          />
          <span className="ml-2">Name</span>
        </label>

        <label
          htmlFor="first-letter-search-radio"
          className="inline-flex items-center cursor-pointer"
        >
          <input
            name="searchTag"
            type="radio"
            id="first-letter-search-radio"
            value="firstLetter"
            checked={ searchTag === 'firstLetter' }
            onChange={ handleSearchTag }
            className="hidden"
          />
          <span
            data-testid="first-letter-search-radio"
            className={ `w-4 h-4 inline-block rounded-full border border-purple 
            transition-all duration-700 
            ${searchTag === 'firstLetter' ? bgAndBorder : ''}` }
          />
          <span className="ml-2">First Letter</span>
        </label>
        <Button
          testId="exec-search-btn"
          disabledCondition={ !searchInput }
          text="Search"
          onClick={ handleSubmit }
          customClass="my-2"
        />
      </fieldset>

    </form>
  );
}
