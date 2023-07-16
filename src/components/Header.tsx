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
    <header className="flex justify-between bg-secondary py-1 px-2">
      {
        showSearchIcon && (
          <button type="button" onClick={ () => setSearchBar(!searchBar) }>
            <img src={ searchIcon } alt="pesquisar" data-testid="search-top-btn" />
          </button>)
      }
      <div className="text-primary font-bold text-center">
        <h1>CookScript</h1>
        <h1 data-testid="page-title">{title}</h1>
      </div>
      <Link to="/profile">
        <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      </Link>
      {searchBar && <SearchBar />}
    </header>
  );
}
