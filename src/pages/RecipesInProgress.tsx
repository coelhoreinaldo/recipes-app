import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RecipeDetailsContext } from '../context/RecipeDetailsProvider';
import ShareFavoriteButtons from '../components/ShareFavoriteButtons';

export default function RecipesInProgress() {
  const { currRecipe, getData,
  } = useContext(RecipeDetailsContext);
  const { strThumb,
    strName, strCategory, strAlcoholic, strInstructions, recipeIngredients } = currRecipe;

  useEffect(() => {
    getData();
  }, []);

  /* 38 – Desenvolva um checkbox para cada item da lista de ingredientes

Observações técnicas
Verifica se os atributos data-testid estão presentes na tela com suas respectivas quantidades.
Os ingredientes deverão ser exibidos em uma label:
Cada label deve ter o atributo data-testid=${index}-ingredient-step.
Dentro de cada label deverá existir um input checkbox.

O que será verificado
Se todos os ingredientes estão sendo exibidos corretamente.
Se cada ingrediente de uma receita de comida/bebida possui um checkbox. */

  return (
    <div>
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
      <section className="mx-4">
        <h3 className="text-lg font-extrabold">Instructions</h3>
        <p
          className="flex gap-2 p-2 border-primary border-2"
          data-testid="instructions"
        >
          {strInstructions}
        </p>
      </section>
      <section className="mx-4">
        <h3 className="text-lg font-extrabold">Ingredients</h3>
        <ul className="flex flex-col gap-2 p-2 border-primary border-2">
          {recipeIngredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <label
                htmlFor={ ingredient }
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id={ ingredient }
                  name={ ingredient }
                  value={ ingredient }
                  className="form-checkbox h-5 w-5 text-primary"
                />
                {ingredient}
              </label>
            </li>
          ))}
        </ul>
      </section>
      <ShareFavoriteButtons />
      <Link
        to="/profile"
        className="border-primary rounded-lg border-2 p-1 w-full text-white
        bg-primary disabled:bg-gray-200 disabled:text-gray-500 hover:bg-purple
        font-bold bottom-0 fixed text-center"
        type="submit"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe

      </Link>
    </div>
  );
}
