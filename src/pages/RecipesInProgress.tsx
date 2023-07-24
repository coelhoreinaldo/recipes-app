import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { RecipeDetailsContext } from '../context/RecipeDetailsProvider';
import ShareFavoriteButtons from '../components/ShareFavoriteButtons';
import { getApiInfo } from '../utils/apiFunctions';
import useLocalStorage from '../hooks/useLocalStorage';

export default function RecipesInProgress() {
  const { currRecipe, getData,
  } = useContext(RecipeDetailsContext);
  const { strThumb,
    strName, strCategory, strAlcoholic, strInstructions, recipeIngredients } = currRecipe;
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [inProgressStorage, setInProgressStorage] = useLocalStorage(
    'inProgressRecipes',
    {},
  );
  const { pathname } = useLocation();
  const { recipeType } = getApiInfo(pathname);
  const { id } = useParams();

  const handleIngredientClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    ing:string,
  ) => {
    if (event.target.checked) {
      setInProgressStorage({
        ...inProgressStorage,
        [recipeType]: {
          ...inProgressStorage[recipeType],
          [id || 0]: [...checkedIngredients, ing],
        },
      });
      return setCheckedIngredients([...checkedIngredients, ing]);
    }
    setInProgressStorage({
      ...inProgressStorage,
      [recipeType]: {
        ...inProgressStorage[recipeType],
        [id || 0]: checkedIngredients.filter((e) => e !== ing),
      },
    });
    return setCheckedIngredients(checkedIngredients.filter((e) => e !== ing));
  };

  const getLocalStorageInProgressRecipes = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')
    || '{}');
    if (Object.keys(inProgressRecipes).length > 0
    && inProgressRecipes[recipeType][id || 0]) {
      setCheckedIngredients(inProgressRecipes[recipeType][id || 0]);
    }
  };

  useEffect(() => {
    getData();
    getLocalStorageInProgressRecipes();
  }, []);

  // useEffect(() => {
  //   const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')
  //    || '{}');
  //   if (Object.keys(inProgressRecipes).length > 0) {
  //     console.log(inProgressRecipes);
  //   }
  // }, [checkedIngredients]);
  /* 40 - Salve o estado do progresso, que deve ser mantido caso a pessoa atualize a página ou volte para a mesma receita

Observações técnicas
Após clicar no checkbox em um dos ingredientes da receita, é esperado que o ingrediente permaneça marcado após a página recarregar. Para isso, desenvolva a lógica de verificação de acordo com a chave inProgressRecipes no localStorage.

O que será verificado
Se salva o progresso de uma receita de comida em andamento.
Se salva o progresso de uma receita de bebida em andamento. */

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
                  className="form-checkbox h-5 w-5 text-primary"
                  onChange={ (event) => handleIngredientClick(event, ingredient) }
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
