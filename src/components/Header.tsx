import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  const history = useHistory();

  console.log(history);
  return (
    <header>
      <button type="button">
        <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      </button>
      <h1>CookScript</h1>
      <button type="button">
        <img src={ searchIcon } alt="pesquisar" data-testid="search-top-btn" />
      </button>
      <h1 data-testid="page-title">Title</h1>
    </header>
  );
}
