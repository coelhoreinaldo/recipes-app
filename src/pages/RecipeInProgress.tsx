import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { RecipeDetailsContext } from '../context/RecipeDetailsProvider';
import ShareFavoriteButtons from '../components/ShareFavoriteButtons';
import { getApiInfo } from '../utils/apiFunctions';
import useLocalStorage from '../hooks/useLocalStorage';
import { IDoneRecipe } from '../types/recipeTypes';

export default function RecipeInProgress() {
  const { currRecipe, getRecipeDetailsById,
  } = useContext(RecipeDetailsContext);
  const { strThumb,
    strName, strCategory, strAlcoholic, strInstructions, recipeIngredients } = currRecipe;
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [inProgressStorage, setInProgressStorage] = useLocalStorage(
    'inProgressRecipes',
    { meals: {}, drinks: {} },
  );

  const [doneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes', []);
  const { pathname } = useLocation();
  const { recipeType } = getApiInfo(pathname);
  const { id } = useParams();
  const recipeId = id || pathname.split('/')[2];
  const isMeal = pathname.includes('meals');
  const navigate = useNavigate();

  const handleIngredientClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    ing:string,
  ) => {
    if (event.target.checked) {
      setInProgressStorage({
        ...inProgressStorage,
        [recipeType]: {
          ...inProgressStorage[recipeType],
          [recipeId]: [...checkedIngredients, ing],
        },
      });
      return setCheckedIngredients([...checkedIngredients, ing]);
    }
    setInProgressStorage({
      ...inProgressStorage,
      [recipeType]: {
        ...inProgressStorage[recipeType],
        [recipeId]: checkedIngredients.filter((e) => e !== ing),
      },
    });
    return setCheckedIngredients(checkedIngredients.filter((e) => e !== ing));
  };

  const getLocalStorageInProgressRecipes = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')
    || '{}');
    if (Object.keys(inProgressRecipes).length > 0
    && inProgressRecipes[recipeType][recipeId]) {
      setCheckedIngredients(inProgressRecipes[recipeType][recipeId]);
    }
  };

  const handleFinishRecipe = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (doneRecipes.some((recipe:IDoneRecipe) => recipe.id === id)) {
      return navigate('/done-recipes');
    }
    const doneDate = new Date();
    const doneRecipe = {
      id,
      type: isMeal ? 'meal' : 'drink',
      nationality: currRecipe.strArea,
      category: currRecipe.strCategory,
      alcoholicOrNot: currRecipe.strAlcoholic,
      name: currRecipe.strName,
      image: currRecipe.strThumb,
      doneDate: doneDate.toISOString(),
      tags: currRecipe.strTags,
    };
    setDoneRecipes([...doneRecipes, doneRecipe]);
    navigate('/done-recipes');
  };

  useEffect(() => {
    getRecipeDetailsById();
    getLocalStorageInProgressRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pb-12">
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
      <button
        className="border-primary rounded-lg border-2 p-1 w-full text-white
        bg-primary disabled:bg-gray-200 disabled:text-gray-500 hover:bg-purple
        font-bold bottom-0 fixed text-center"
        disabled={ checkedIngredients.length !== recipeIngredients.length }
        type="submit"
        data-testid="finish-recipe-btn"
        onClick={ handleFinishRecipe }
      >
        Finish Recipe

      </button>
    </div>
  );
}
