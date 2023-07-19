import { IDoneRecipe, IMeal, IDrink } from '../types/recipeTypes';

export const getLocalStorageDoneRecipes = (currRecipe: IMeal | IDrink) => {
  if (localStorage.getItem('doneRecipes')) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const hasInLocalStorage = doneRecipes.some(
      (e: IDoneRecipe) => e.id === (isMealRecipe(currRecipe)
        ? currRecipe.idMeal : currRecipe.idDrink),
    );
    console.log(currRecipe);
    return hasInLocalStorage;
  }
};

function isMealRecipe(recipe: IMeal | IDrink): recipe is IMeal {
  return (recipe as IMeal).idMeal !== undefined;
}
