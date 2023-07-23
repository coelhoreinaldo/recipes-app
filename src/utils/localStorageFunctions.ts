import { IDoneRecipe, IMeal, IDrink } from '../types/recipeTypes';

function isMealRecipe(recipe: IMeal | IDrink): recipe is IMeal {
  return (recipe as IMeal).idMeal !== undefined;
}

export const getLocalStorageDoneRecipes = (currRecipe: IMeal | IDrink) => {
  if (localStorage.getItem('doneRecipes')) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const hasInLocalStorage = doneRecipes.some(
      (e: IDoneRecipe) => e.id === (isMealRecipe(currRecipe)
        ? currRecipe.idMeal : currRecipe.idDrink),
    );
    return hasInLocalStorage;
  }
};

export const getLocalStorageInProgressRecipes = (
  currRecipe: IMeal | IDrink,
  recipeType:string,
) => {
  if (localStorage.getItem('inProgressRecipes')) {
    const inProgressLocal = JSON.parse(localStorage.getItem('inProgressRecipes') || '[]');
    const inProgressRecipes = Object.keys(inProgressLocal[recipeType]);
    return inProgressRecipes.includes((isMealRecipe(currRecipe)
      ? currRecipe.idMeal : currRecipe.idDrink));
  }
  return false;
};

export const verifyFavoriteInStorage = (currRecipe: IMeal | IDrink) => {
  if (localStorage.getItem('favoriteRecipes')) {
    const favoriteRecipesStorage = JSON.parse(
      localStorage.getItem('favoriteRecipes') || '[]',
    );
    const check = favoriteRecipesStorage
      .some((e:IDoneRecipe) => e.id === (isMealRecipe(currRecipe)
        ? currRecipe.idMeal : currRecipe.idDrink));
    return check;
  }
};
