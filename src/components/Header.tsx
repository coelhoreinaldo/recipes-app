import { Link } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import logoIcon from '../images/logoIcon.svg';

interface Props {
  showSearchIcon?:boolean
}

export default function Header({ showSearchIcon = false }:Props) {
  const [searchBar, setSearchBar] = useState(false);
  return (
    <header
      className="flex flex-col items-center bg-secondary py-3 px-4 justify-center"
    >
      <section className="flex justify-between items-center w-full">

        <Link to="/meals" className="text-primary text-center flex gap-1">
          <img src={ logoIcon } alt="logo" />
          <h1 className="italic self-end justify-end">
            Recipes
            {' '}
            <span className="not-italic font-bold">app</span>
          </h1>
        </Link>
        <div className="flex gap-4">
          {
        showSearchIcon && (
          <button
            type="button"
            onClick={ () => setSearchBar(!searchBar) }
            className="flex gap-2
           font-semibold items-center"
          >
            <img src={ searchIcon } alt="pesquisar" data-testid="search-top-btn" />
            <span className="hidden sm:block">Search</span>
          </button>)
      }
          <Link to="/profile" className="flex gap-2 font-semibold items-center">
            <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
            <span className="hidden sm:block">Profile</span>
          </Link>
        </div>
      </section>
      {searchBar && <SearchBar />}
    </header>
  );
}
