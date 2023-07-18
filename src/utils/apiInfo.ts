export const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const MEALS_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const DRINKS_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const getApiInfo = (pathname: string) => {
  let apiInfo = {
    recipeApi: 'meal',
    recipeType: 'meals',
    recipeId: 'idMeal',
  };

  if (pathname.includes('/drinks')) {
    apiInfo = {
      recipeApi: 'cocktail',
      recipeType: 'drinks',
      recipeId: 'idDrink',
    };
  }

  return apiInfo;
};
