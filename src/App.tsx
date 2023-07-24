import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Routes>
      <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/meals/:id" element={ <RecipeDetails /> } />
      <Route path="/drinks/:id" element={ <RecipeDetails /> } />
      <Route path="/meals" element={ <Meals /> } />
      <Route path="/drinks" element={ <Drinks /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      <Route path="/" element={ <Login /> } />
    </Routes>
  );
}

export default App;
