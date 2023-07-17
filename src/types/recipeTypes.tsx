export interface IRecipeCard {
  index: number,
  idRecipe: string,
  strRecipe: string,
  pathname: string,
  strRecipeThumb: string,
  dataTestId: string,
  dataTestIdTitle: string,
  cardClass: string,
}

export interface IMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface IDrink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}
