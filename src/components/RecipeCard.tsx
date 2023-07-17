import { Link } from 'react-router-dom';
import { IRecipeCard } from '../types/recipeTypes';

function RecipeCard({
  index, pathname, idRecipe, strRecipe, strRecipeThumb,
  dataTestId, dataTestIdTitle, cardClass,
}:IRecipeCard) {
  return (
    <Link
      className={ cardClass }
      data-testid={ dataTestId }
      to={ `${pathname}/${idRecipe}` }
    >
      <img
        width={ 150 }
        src={ strRecipeThumb }
        alt={ strRecipe }
        data-testid={ `${index}-card-img` }
      />
      <h3 data-testid={ dataTestIdTitle }>{strRecipe}</h3>
    </Link>
  );
}

export default RecipeCard;
