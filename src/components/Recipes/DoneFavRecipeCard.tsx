import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { IDoneRecipe } from '../../types/recipeTypes';
import ShareButton from '../Buttons/ShareButton';

import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { RecipeDetailsContext } from '../../context/RecipeDetailsProvider';

type Props = {
  filteredRecipes: IDoneRecipe[];
  isDoneRecipe?: boolean;
  setFilteredRecipes: React.Dispatch<React.SetStateAction<IDoneRecipe[]>>;
};

export default function DoneFavRecipeCard({
  filteredRecipes, isDoneRecipe = false, setFilteredRecipes,
}: Props) {
  const { favorites, setFavorites } = useContext(RecipeDetailsContext);

  const handleFavoriteClick = (item: IDoneRecipe) => {
    const newFavorites = favorites.filter((recipe: IDoneRecipe) => recipe.id !== item.id);
    setFavorites(newFavorites);
    setFilteredRecipes(newFavorites);
  };

  return (
    <section className="mx-4 flex flex-col relative gap-y-4 ">
      {filteredRecipes && filteredRecipes.length === 0 && (
        <p
          className="text-center text-2xl font-bold"
          data-testid="text-for-no-done-recipes"
        >
          {isDoneRecipe
            ? 'You haven\'t finished any recipe yet'
            : 'You don\'t have any favorite recipe yet'}
        </p>
      )}
      {filteredRecipes && filteredRecipes.map((recipe, index) => (
        <section
          className="flex relative border-slate-200 border-2
           gap-4 items-center h-36 overflow-hidden"
          key={ index }
        >
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
            className="overflow-hidden"
          >
            <img
              src={ recipe.image }
              alt={ recipe.name }
              className=" h-36 object-cover aspect-auto"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <div
            className="py-1 space-y-1 flex flex-col justify-between h-full w-1/2 text-xs"
          >
            <div className="flex flex-col space-y-2">
              <Link
                to={ `/${recipe.type}s/${recipe.id}` }
                className="text-sm font-bold pr-16 flex flex-wrap"
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </Link>

              <h4
                className="text-gray-400"
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.nationality} - ${recipe.category} ${recipe.alcoholicOrNot}`}
              </h4>
            </div>
            {isDoneRecipe && (
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}

              </p>
            )}
            <div className="flex space-x-1">
              {isDoneRecipe
              && recipe.tags.map((tag, i) => (
                <p
                  key={ i }
                  className="bg-secondary rounded-full px-1"
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}

                </p>
              ))}
            </div>
            <section className="absolute top-0 right-2 z-50 flex gap-1">
              <ShareButton
                recipeType={ `${recipe.type}s` }
                recipeId={ recipe.id }
                testId={ `${index}-horizontal-share-btn` }
              />
              {!isDoneRecipe && (
                <button onClick={ () => handleFavoriteClick(recipe) }>
                  <img
                    src={ blackHeartIcon }
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    alt="favorite icon"
                    width={ 32 }
                  />
                </button>)}
            </section>
          </div>
        </section>
      ))}
    </section>
  );
}
