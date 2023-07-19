export interface IRecipeCard {
  index: number,
  idRecipe: string,
  strRecipe: string,
  strRecipeThumb: string,
  dataTestId: string,
  dataTestIdTitle: string,
  minWidth?: string,
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

export type Category = {
  strCategory: string;
};

export interface IRecipeDetails {
  strThumb: string;
  strName: string;
  strCategory: string;
  strAlcoholic?: string;
  recipeIngredients: string[];
  recipeMeasures: string[];
  strInstructions: string;
  strYoutube?: string;
  isMeal?: boolean;
}

export interface IDoneRecipe {
  id: string;
  type: 'meal' | 'drink';
  nationality: string;
  category: string;
  alcoholicOrNot: 'alcoholic' | 'non-alcoholic' | string;
  name: string;
  image: string;
  doneDate: string;
  tags: string[];
}

export interface IFavoriteRecipe {
  id: string;
  type: 'meal' | 'drink';
  nationality: string;
  category: string;
  alcoholicOrNot: 'alcoholic' | 'non-alcoholic' | string;
  name: string;
  image: string;
}
