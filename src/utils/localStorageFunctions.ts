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
    console.log(currRecipe);
    return hasInLocalStorage;
  }
};

// const getLocalStorageInProgressRecipes = async (currRecipe: IMeal | IDrink) => {
//   if (localStorage.getItem('inProgressRecipes')) {
//     const inProgressLocal = JSON.parse(localStorage.getItem('inProgressRecipes') || '[]');
//     const inProgressRecipes = Object.keys(inProgressLocal[pathname.split('/')[1]]);
//     return inProgressRecipes.includes(currRecipe.idDrink || currRecipe.idMeal);
//   }
// };
