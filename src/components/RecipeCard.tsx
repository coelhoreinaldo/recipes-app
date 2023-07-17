import { Link } from 'react-router-dom';
import { IRecipeCard } from '../types/recipeTypes';

function RecipeCard({
  index, pathname, idRecipe, strRecipe, strRecipeThumb,
  dataTestId, dataTestIdTitle, cardClass,
}:IRecipeCard) {
  return (
    <Link
      className="flex flex-col overflow-hidden items-center shadow-sm
      shadow-primary rounded-md w-full group hover:-translate-y-2 transition"
      data-testid={ dataTestId }
      to={ `${pathname}/${idRecipe}` }
    >
      <img
        width={ 150 }
        src={ strRecipeThumb }
        alt={ strRecipe }
        data-testid={ `${index}-card-img` }
        className="w-full"
      />
      <h3 data-testid={ dataTestIdTitle }>{strRecipe}</h3>
    </Link>
  );
}

export default RecipeCard;
