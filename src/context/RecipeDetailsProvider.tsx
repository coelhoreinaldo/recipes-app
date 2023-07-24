import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import useFetch from '../hooks/useFetch';
import { getApiInfo, getIngredientsAndMeasures } from '../utils/apiFunctions';
import { getLocalStorageDoneRecipes,
  getLocalStorageInProgressRecipes,
  verifyFavoriteInStorage } from '../utils/localStorageFunctions';
import { IDoneRecipe, IRecipeDetails } from '../types/recipeTypes';
import useLocalStorage from '../hooks/useLocalStorage';

export interface RecipeDetailsContextProps {
  isDone: boolean;
  isInProgress: boolean;
  isFavorite: boolean;
  currRecipe: IRecipeDetails;
  getData: () => Promise<void>;
  setIsFavorite: (value: boolean) => void;
  showLinkCopied: boolean;
  handleShareClick: () => void;
  handleFavoriteClick: (item: IRecipeDetails) => void;
}

export const RecipeDetailsContext = createContext<RecipeDetailsContextProps>(
  {} as RecipeDetailsContextProps,
);

export default function RecipeDetailsProvider({ children }:
{ children: React.ReactNode }) {
  const { fetchApi } = useFetch();
  const { pathname } = useLocation();
  const recipeId = pathname.split('/')[2];
  const { recipeApi, recipeType } = getApiInfo(pathname);
  const isMeal = pathname.includes('meals');

  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currRecipe, setCurrRecipe] = useState<IRecipeDetails>({
    strThumb: '',
    strName: '',
    strCategory: '',
    recipeIngredients: [],
    recipeMeasures: [],
    strAlcoholic: '',
    strInstructions: '',
    strYoutube: '',
    strArea: '',
  });

  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [favorites, setFavorites] = useLocalStorage('favoriteRecipes', []);

  const getData = useCallback(async () => {
    const API_URL = `https://www.the${recipeApi}db.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    const recipeData = await fetchApi(API_URL);
    const recipeInfo = recipeData[recipeType][0];
    setIsDone(getLocalStorageDoneRecipes(recipeInfo));
    setIsInProgress(getLocalStorageInProgressRecipes(recipeInfo, recipeType));
    setIsFavorite(verifyFavoriteInStorage(recipeInfo));
    const { ingredients, measures } = getIngredientsAndMeasures(recipeInfo);
    if (isMeal) {
      const embed = recipeInfo.strYoutube.replace('watch?v=', 'embed/');
      recipeInfo.strYoutube = embed;
    }
    return setCurrRecipe({
      strThumb: recipeInfo.strMealThumb || recipeInfo.strDrinkThumb,
      strName: recipeInfo.strMeal || recipeInfo.strDrink,
      strCategory: recipeInfo.strCategory,
      strAlcoholic: recipeInfo.strAlcoholic || '',
      recipeIngredients: ingredients,
      recipeMeasures: measures,
      strInstructions: recipeInfo.strInstructions,
      strYoutube: recipeInfo.strYoutube || '',
      strArea: recipeInfo.strArea || '',
    });
  }, [fetchApi, isMeal, recipeApi, recipeType, recipeId]);

  const handleShareClick = () => {
    setShowLinkCopied(true);
    copy(window.location.href.split('/').slice(0, 5).join('/'));
  };

  const handleFavoriteClick = useCallback((item: IRecipeDetails) => {
    const recipeInfo = {
      id: recipeId,
      type: isMeal ? 'meal' : 'drink',
      nationality: item.strArea,
      category: item.strCategory,
      alcoholicOrNot: item.strAlcoholic || '',
      name: item.strName,
      image: item.strThumb,
    };
    if (isFavorite) {
      const favoritesUpdated = favorites
        .filter((favorite:IDoneRecipe) => favorite.id !== recipeId);
      setFavorites([...favoritesUpdated]);
    }
    if (!isFavorite) {
      setFavorites([...favorites, recipeInfo]);
    }
    return setIsFavorite(!isFavorite);
  }, [favorites, isFavorite, isMeal, recipeId, setFavorites]);

  const values = useMemo(() => ({
    isDone,
    isInProgress,
    isFavorite,
    currRecipe,
    getData,
    setIsFavorite,
    showLinkCopied,
    handleShareClick,
    handleFavoriteClick,
  }), [isDone, isInProgress,
    isFavorite, currRecipe, getData, showLinkCopied, handleFavoriteClick]);

  return (
    <RecipeDetailsContext.Provider value={ values }>
      {children}
    </RecipeDetailsContext.Provider>
  );
}
