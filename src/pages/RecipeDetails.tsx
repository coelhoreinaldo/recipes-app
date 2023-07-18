import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import RecipeCard from '../components/RecipeCard';
import { getApiInfo } from '../utils/apiInfo';
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
    strInstructions: '',
    strYoutube: '',
    strAlcoholic: '',
  });
  const {
    strThumb, strName, strCategory, strInstructions, strYoutube, strAlcoholic,
  } = currRecipe;

  const getData = async () => {
    const { recipeApi, recipeType } = getApiInfo(pathname);
    const API_URL = `https://www.the${recipeApi}db.com/api/json/v1/1/lookup.php?i=${params.id}`;
    const recipeData = await fetchApi(API_URL);
    const recipeInfo = recipeData[recipeType][0];
    console.log(recipeInfo);
    return setCurrRecipe({
      strThumb: recipeInfo.strMealThumb || recipeInfo.strDrinkThumb,
      strName: recipeInfo.strMeal || recipeInfo.strThumb,
      strCategory: recipeInfo.strCategory,
      strAlcoholic: recipeInfo.strAlcoholic || '',
      // recipeIngredients: recipeInfo.recipeIngredients,
      // recipeMeasures: recipeInfo.recipeMeasures,
      strInstructions: recipeInfo.strInstructions,
      strYoutube: recipeInfo.youtubeLink || '',
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      RecipeDetails
      {
      pathname.includes('meals')
        ? <RecipeDetailsCard
            strThumb={ strThumb }
            strName={ strName }
            strCategory={ strCategory }
            strAlcoholic={ strAlcoholic }
            // recipeIngredients={ recipeIngredients }
            // recipeMeasures={ recipeMeasures }
            strInstructions={ strInstructions }
            strYoutube={ strYoutube }
        />
        : <RecipeDetailsCard
            strThumb={ strThumb }
            strName={ strName }
            strCategory={ strCategory }
            strAlcoholic={ strAlcoholic }
            // recipeIngredients={ recipeIngredients }
            // recipeMeasures={ recipeMeasures }
            strInstructions={ strInstructions }
            strYoutube={ strYoutube }
        />
    }
    </div>
  );
}
