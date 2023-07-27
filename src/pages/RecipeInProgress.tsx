import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { RecipeDetailsContext } from '../context/RecipeDetailsProvider';
import { getApiInfo } from '../utils/apiFunctions';
import useLocalStorage from '../hooks/useLocalStorage';
import { IDoneRecipe } from '../types/recipeTypes';
import Button from '../components/Buttons/Button';
import RecipeImageTitle from '../components/Recipes/RecipeImageTitle';

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
  let recipeId = pathname.split('/')[2];
  if (id) {
    recipeId = id;
  }
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
      type: recipeType.slice(0, -1),
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

  const noRepeatIngredients = recipeIngredients
    .filter((ingredient, i) => recipeIngredients.indexOf(ingredient) === i);

  return (
    <div className="pb-16">
      <RecipeImageTitle
        strThumb={ strThumb }
        strName={ strName }
        strCategory={ strCategory }
        strAlcoholic={ strAlcoholic }
        recipeType={ recipeType }
        recipeId={ recipeId }
      />
      <section className="mx-4">
        <h3 className="text-lg font-extrabold">Instructions</h3>
        <p
          className="flex gap-2 p-2 border-primary border"
          data-testid="instructions"
        >
          {strInstructions}
        </p>
      </section>
      <section className="mx-4">
        <h3 className="text-lg font-extrabold">Ingredients</h3>
        <ul className="flex flex-col gap-2 p-2 border-primary border">
          {noRepeatIngredients
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
      <div className="w-full flex justify-center">
        <Button
          testId="finish-recipe-btn"
          disabledCondition={ checkedIngredients.length !== noRepeatIngredients.length }
          onClick={ handleFinishRecipe }
          text="Finish Recipe"
          customClass="bottom-4 fixed w-11/12"
        />
      </div>
    </div>
  );
}
