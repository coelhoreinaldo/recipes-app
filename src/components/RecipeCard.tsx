import { Link } from 'react-router-dom';
import { IRecipeCard } from '../types/recipeTypes';

function RecipeCard({
  index, idRecipe, strRecipe, strRecipeThumb,
  dataTestId, dataTestIdTitle, minWidth = '', pathname = 'meals/',
}:IRecipeCard) {
  return (
    <Link
      className={ `flex flex-col overflow-hidden rounded-md w-full group
       shadow-md shadow-primary hover:-translate-y-2 transition ${minWidth}` }
      data-testid={ dataTestId }
      to={ `/${pathname}${idRecipe}` }
    >
      <img
        src={ strRecipeThumb }
        alt={ strRecipe }
        data-testid={ `${index}-card-img` }
        className="aspect-auto"
      />
      <h3
        className="py-1 px-2 text-slate-900 truncate ... text-sm"
        data-testid={ dataTestIdTitle }
      >
        {strRecipe}

      </h3>
    </Link>
  );
}

export default RecipeCard;
