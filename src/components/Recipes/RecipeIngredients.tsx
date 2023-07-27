import React from 'react';

interface Props {
  recipeIngredients: string[];
  recipeMeasures: string[];
}

export default function RecipeIngredients({
  recipeIngredients,
  recipeMeasures,
}: Props) {
  return (
    <section className="mx-4">
      <h3 className="text-lg font-extrabold">Ingredients</h3>
      <ul className="flex gap-2 list-inside p-2 border-primary border text-sm">
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
  );
}
