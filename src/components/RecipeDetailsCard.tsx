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
    <>
      <section>
        <img
          src={ strThumb }
          alt={ strName }
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">{strName}</h2>
      </section>
      <h3 data-testid="recipe-category">
        {strCategory}
        {strAlcoholic && ` - ${strAlcoholic}`}
      </h3>
      <hr />
      <section>
        <h3>Ingredients</h3>
        <ul className="flex gap-2">
          <div>
            {recipeIngredients.map((ing, i) => (
              <li data-testid={ `${i}-ingredient-name-and-measure` } key={ i }>
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
      <section>
        <h3>Instructions</h3>
        <p data-testid="instructions">{strInstructions}</p>
      </section>
      {isMeal && strYoutube && (
        <section>
          <h3>Video</h3>
          <iframe
            title="Recipe"
            width="280px"
            data-testid="video"
            allowFullScreen
            src={ strYoutube }
          />
        </section>
      )}
    </>
  );
}

export default RecipeDetailsCard;
