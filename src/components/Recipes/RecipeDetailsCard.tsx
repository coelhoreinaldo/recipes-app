import { IRecipeDetails } from '../../types/recipeTypes';
import RecipeImageTitle from './RecipeImageTitle';
import RecipeIngredients from './RecipeIngredients';
import RecipeInstructions from './RecipeInstructions';

interface RecipeDetailsCardProps extends IRecipeDetails {
  recipeType: string;
  recipeId: string;
}

function RecipeDetailsCard({
  strThumb,
  strName,
  strCategory,
  strAlcoholic = '',
  recipeIngredients,
  recipeMeasures,
  strInstructions,
  strYoutube = '',
  isMeal = false,
  recipeType,
  recipeId,
}:RecipeDetailsCardProps) {
  return (
    <section className="flex flex-col gap-2 relative">
      <RecipeImageTitle
        strThumb={ strThumb }
        strName={ strName }
        strCategory={ strCategory }
        strAlcoholic={ strAlcoholic }
        recipeType={ recipeType }
        recipeId={ recipeId }
      />
      <RecipeIngredients
        recipeIngredients={ recipeIngredients }
        recipeMeasures={ recipeMeasures }
      />
      <RecipeInstructions strInstructions={ strInstructions } />
      {isMeal && strYoutube && (
        <section className="justify-center flex flex-col lg:px-96">
          <h3 className="text-lg font-extrabold px-4 text-center">Video</h3>
          <iframe
            title="Recipe"
            data-testid="video"
            className="aspect-auto lg:h-96 lg:w-auto"
            allowFullScreen
            src={ strYoutube }
          />
        </section>
      )}
    </section>
  );
}

export default RecipeDetailsCard;
