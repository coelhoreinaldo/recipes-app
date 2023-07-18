import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getApiInfo, getIngredientsAndMeasures } from '../utils/apiFunctions';
import RecipeDetailsCard from '../components/RecipeDetailsCard';
import { IRecipeDetails } from '../types/recipeTypes';

export default function RecipeDetails() {
  const params = useParams();
  const { fetchApi } = useFetch();
  const { pathname } = useLocation();
  const [currRecipe, setCurrRecipe] = useState<IRecipeDetails>({
    strThumb: '',
    strName: '',
    strCategory: '',
    recipeIngredients: [],
    recipeMeasures: [],
    strAlcoholic: '',
    strInstructions: '',
    strYoutube: '',
  });
  const {
    strThumb, strName, strCategory, recipeIngredients,
    recipeMeasures, strInstructions, strYoutube, strAlcoholic,
  } = currRecipe;

  const getData = async () => {
    const { recipeApi, recipeType } = getApiInfo(pathname);
    const API_URL = `https://www.the${recipeApi}db.com/api/json/v1/1/lookup.php?i=${params.id}`;
    const recipeData = await fetchApi(API_URL);
    const recipeInfo = recipeData[recipeType][0];
    const { ingredients, measures } = getIngredientsAndMeasures(recipeInfo);
    if (pathname.includes('meals')) {
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
    });
  };

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    pathname.includes('meals')
      ? <RecipeDetailsCard
          strThumb={ strThumb }
          strName={ strName }
          strCategory={ strCategory }
          strAlcoholic={ strAlcoholic }
          recipeIngredients={ recipeIngredients }
          recipeMeasures={ recipeMeasures }
          strInstructions={ strInstructions }
          strYoutube={ strYoutube }
          isMeal
      />
      : <RecipeDetailsCard
          strThumb={ strThumb }
          strName={ strName }
          strCategory={ strCategory }
          strAlcoholic={ strAlcoholic }
          recipeIngredients={ recipeIngredients }
          recipeMeasures={ recipeMeasures }
          strInstructions={ strInstructions }
          strYoutube={ strYoutube }
      />

  );
}
