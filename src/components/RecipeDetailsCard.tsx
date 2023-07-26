import { IRecipeDetails } from '../types/recipeTypes';
import RecipeImageTitle from './RecipeImageTitle';

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
      <section className="mx-4 text-sm">
        <h3 className="text-lg font-extrabold">Ingredients</h3>
        <ul className="flex gap-2 list-inside p-2 border-primary border-2">
          <div>
            {recipeIngredients.map((ing, i) => (
              <li
                className="list-disc"
                data-testid={ `${i}-ingredient-name-and-measure` }
                key={ i }
              >
                {ing}
              </li>
            ))}
          </div>
          <div>
            {recipeMeasures.map((mea, i) => (
              <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
                {mea}
              </li>
            ))}
          </div>
        </ul>
      </section>
      <section className="mx-4">
        <h3 className="text-lg font-extrabold">Instructions</h3>
        <article
          className="whitespace-pre-wrap flex gap-2 p-2 border-primary border-2
          overflow-auto h-64"
          data-testid="instructions"
        >
          {strInstructions}
        </article>
      </section>
      {isMeal && strYoutube && (
        <section>
          <h3 className="text-lg font-extrabold px-4 text-center">Video</h3>
          <iframe
            title="Recipe"
            data-testid="video"
            className="aspect-auto w-full"
            allowFullScreen
            src={ strYoutube }
          />
        </section>
      )}
    </section>
  );
}

export default RecipeDetailsCard;
