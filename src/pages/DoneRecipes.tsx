import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { IDoneRecipe } from '../types/recipeTypes';
import ShareButton from '../components/Buttons/ShareButton';
import RecipeTypeButton from '../components/Buttons/RecipeTypeButton';

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
      <Header title="Done Recipes" />
      <section className="flex gap-4 w-full items-center justify-center mt-6">
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

      <section className="flex flex-col relative m-6 gap-y-4 ">
        {filteredRecipes.map((recipe, index) => (
          <section
            className="grid grid-cols-2 relative
           gap-4 items-center bg-slate-200 h-36"
            key={ index }
          >
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
                width={ 144 }
                height={ 144 }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div className="pr-4 grid">
              <Link
                to={ `/${recipe.type}s/${recipe.id}` }
                className="text-lg font-bold"
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </Link>

              <h4
                className="text-sm text-gray-400"
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.nationality} - ${recipe.category} ${recipe.alcoholicOrNot}`}
              </h4>
              <p
                className="text-sm"
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}

              </p>
              <div className="flex text-sm space-x-1 flex-wrap">
                {
              recipe.tags.map((tag, i) => (
                <p
                  key={ i }
                  className="bg-secondary rounded-full "
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}

                </p>
              ))
            }
              </div>
              <ShareButton
                customClass="absolute top-2 right-2 z-50"
                recipeType={ `${recipe.type}s` }
                recipeId={ recipe.id }
                testId={ `${index}-horizontal-share-btn` }
              />
            </div>
          </section>
        ))}
      </section>
      <Footer />
    </div>
  );
}
