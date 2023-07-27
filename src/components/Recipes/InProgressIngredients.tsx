import React from 'react';

type Props = {
  recipeIngredients: string[];
  checkedIngredients: string[];
  handleIngredientClick: (event: React.ChangeEvent<HTMLInputElement>, i: string) => void;
};

export default function InProgressIngredients({
  recipeIngredients,
  checkedIngredients,
  handleIngredientClick,
}: Props) {
  return (
    <section className="mx-4">
      <h3 className="text-lg font-extrabold">Ingredients</h3>
      <ul className="flex flex-col gap-2 p-2 border-primary border">
        {recipeIngredients
          .map((ingredient, index) => (
            <li
              key={ index }
            >
              <label
                htmlFor={ ingredient }
                className={ `flex items-center gap-2 
          ${checkedIngredients.includes(ingredient) ? 'line-through' : ''}` }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ ingredient }
                  name={ ingredient }
                  value={ ingredient }
                  checked={ checkedIngredients.includes(ingredient) }
                  className="form-checkbox h-5 w-5 text-primary accent-secondary"
                  onChange={ (event) => handleIngredientClick(event, ingredient) }
                />
                {ingredient}
              </label>
            </li>
          ))}
      </ul>
    </section>

  );
}
