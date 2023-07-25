import React from 'react';
import { Link } from 'react-router-dom';
import { IDoneRecipe } from '../types/recipeTypes';
import ShareButton from './Buttons/ShareButton';

type Props = {
  filteredRecipes: IDoneRecipe[];
  isDoneRecipe?: boolean;
};

export default function DoneFavRecipeCard({ filteredRecipes, isDoneRecipe = false,
}: Props) {
  return (
    <section className="flex flex-col relative m-6 gap-y-4 ">
      {filteredRecipes && filteredRecipes.length === 0 && (
        <p
          className="text-center text-2xl font-bold"
          data-testid="text-for-no-done-recipes"
        >
          {'You haven\'t finished any recipe yet'}
        </p>
      )}
      {filteredRecipes && filteredRecipes.map((recipe, index) => (
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
            {isDoneRecipe && (
              <p
                className="text-sm"
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}

              </p>
            )}
            <div className="flex text-sm space-x-1 flex-wrap">
              {isDoneRecipe
              && recipe.tags.map((tag, i) => (
                <p
                  key={ i }
                  className="bg-secondary rounded-full "
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}

                </p>
              ))}
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
  );
}
