import { Link } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

interface Props {
  title:string
  showSearchIcon?:boolean
}

export default function Header({ title, showSearchIcon = false }:Props) {
  const [searchBar, setSearchBar] = useState(false);
  return (
    <header
      className="flex flex-col items-center bg-secondary py-1 px-4 justify-center"
    >
      <section className="flex justify-between items-center w-full">
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
        <div className="text-primary text-center">
          <h1 className="italic">
            Recipes
            {' '}
            <span className="not-italic font-bold ">app</span>
          </h1>
          <h1 data-testid="page-title">{title}</h1>
        </div>
        <Link to="/profile" className="flex gap-2 font-semibold items-center">
          <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
          <span className="hidden sm:block">Profile</span>
        </Link>
      </section>
      {searchBar && <SearchBar />}
    </header>
  );
}
