import React from 'react';
import { IRecipeDetails } from '../types/recipeTypes';

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
}:IRecipeDetails) {
  return (
    <section className="text-sm flex flex-col gap-2 relative">
      <section className="relative h-64 flex items-center justify-center">
        <img
          src={ strThumb }
          alt={ strName }
          data-testid="recipe-photo"
          className="w-full h-full object-cover absolute"
        />
        <h2
          className="bottom-0 left-0 text-4xl font-bold w-full flex
          uppercase justify-center items-center text-center bg-black
          bg-opacity-60 h-full text-white p-2 z-50"
          data-testid="recipe-title"
        >
          {strName}

        </h2>
        <h4
          data-testid="recipe-category"
          className="z-50 absolute top-4 text-secondary font-bold left-4"
        >
          {strCategory}
          {strAlcoholic && ` - ${strAlcoholic}`}
        </h4>
      </section>
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
