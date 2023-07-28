import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { IDoneRecipe } from '../types/recipeTypes';
import RecipeTypeButton from '../components/Buttons/RecipeTypeButton';
import DoneFavRecipeCard from '../components/Recipes/DoneFavRecipeCard';
import PageTitle from '../components/PageTitle';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState<IDoneRecipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<IDoneRecipe[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const getDoneRecipesFromStorage = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    setFilteredRecipes(doneRecipes);
    return setRecipes(doneRecipes);
  };

  const handleFilterClick = (filter:string) => {
    if (filter === 'All') {
      setActiveFilter(filter);
      return setFilteredRecipes(recipes);
    }
    const filtered = recipes.filter((recipe) => recipe.type === filter.toLowerCase());
    setActiveFilter(filter);
    return setFilteredRecipes(filtered);
  };

  useEffect(() => {
    getDoneRecipesFromStorage();
  }, []);

  return (
    <div className="pb-16">
      <Header />
      <PageTitle title="Done Recipes" />
      <section className="flex gap-4 w-full items-center justify-center">
        <RecipeTypeButton
          handleFilterClick={ handleFilterClick }
          filterType="All"
          filterName="All"
          activeFilter={ activeFilter }
          testId="filter-by-all-btn"
        />
        <RecipeTypeButton
          handleFilterClick={ handleFilterClick }
          filterType="meal"
          filterName="Meals"
          activeFilter={ activeFilter }
          testId="filter-by-meal-btn"
        />
        <RecipeTypeButton
          handleFilterClick={ handleFilterClick }
          filterType="drink"
          filterName="Drinks"
          activeFilter={ activeFilter }
          testId="filter-by-drink-btn"
        />
      </section>
      <DoneFavRecipeCard
        isDoneRecipe
        filteredRecipes={ filteredRecipes }
        setFilteredRecipes={ setFilteredRecipes }
      />
      <Footer />
    </div>
  );
}
