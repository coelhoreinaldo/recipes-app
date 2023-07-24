import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { IDoneRecipe } from '../types/recipeTypes';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState<IDoneRecipe[]>([]);

  const getData = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    console.log(doneRecipes);

    setRecipes(doneRecipes);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="pb-16">
      <Header title="Done Recipes" />
      <section className="flex gap-4 w-full items-center justify-center">
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-meal-btn">Meals</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </section>

      <section className="flex flex-col relative mx-6 gap-y-4 ">
        {recipes.map((recipe, index) => (
          <section
            className="grid grid-cols-2 relative
           gap-4 items-center bg-slate-200 h-36"
            key={ index }
          >
            <img
              src={ recipe.image }
              alt={ recipe.name }
              width={ 144 }
              height={ 144 }
              data-testid={ `${index}-horizontal-image` }
            />
            <div className="pr-4">
              <h3
                className="text-lg font-bold"
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}

              </h3>
              <h4
                className="text-sm text-gray-400"
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.category}

              </h4>
              <p
                className="text-sm"
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}

              </p>
              <div className="flex gap-4 text-sm">
                {
              recipe.tags.map((tag, i) => (
                <p
                  key={ i }
                  className="bg-secondary rounded-full px-1"
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}

                </p>
              ))
            }
              </div>
              <button
                className="absolute top-2 right-2"
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
              >
                <img src={ shareIcon } alt="Share" />
              </button>
            </div>
          </section>
        ))}
      </section>

      <Footer />
    </div>
  );
}
