import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getApiInfo, getIngredientsAndMeasures } from '../utils/apiFunctions';
import RecipeDetailsCard from '../components/RecipeDetailsCard';
import { IDrink, IMeal, IRecipeDetails } from '../types/recipeTypes';
import RecipeCard from '../components/RecipeCard';

export default function RecipeDetails() {
  const params = useParams();
  const { fetchApi } = useFetch();
  const { pathname } = useLocation();
  const isMeal = pathname.includes('meals');
  const { recipeApi, recipeType } = getApiInfo(pathname);
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
  const [recommendations, setRecommendations] = useState([]);

  const getData = async () => {
    const API_URL = `https://www.the${recipeApi}db.com/api/json/v1/1/lookup.php?i=${params.id}`;
    const recipeData = await fetchApi(API_URL);
    const recipeInfo = recipeData[recipeType][0];
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
    });
  };

  const getRecommendations = async () => {
    let recommendationsData = await fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    if (!isMeal) {
      recommendationsData = await fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
    recommendationsData = recommendationsData.meals || recommendationsData.drinks;
    return setRecommendations(recommendationsData.slice(0, 6));
  };

  useEffect(() => {
    getData();
    getRecommendations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isMeal
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
        />}
      <section
        className="flex items-center mt-4 rounded-lg
        min-h-[190px] overflow-x-auto max-w-full gap-x-4"
      >
        {
        !isMeal
          ? recommendations.map((meal:IMeal, index) => (
            <RecipeCard
              minWidth="min-w-[160px]"
              dataTestId={ `${index}-recommendation-card` }
              dataTestIdTitle={ `${index}-recommendation-title` }
              key={ meal.idMeal }
              index={ index }
              idRecipe={ meal.idMeal }
              strRecipe={ meal.strMeal }
              strRecipeThumb={ meal.strMealThumb }
            />
          ))
          : recommendations.map((drink:IDrink, index) => (
            <RecipeCard
              minWidth="min-w-[160px]"
              dataTestId={ `${index}-recommendation-card` }
              dataTestIdTitle={ `${index}-recommendation-title` }
              key={ drink.idDrink }
              index={ index }
              idRecipe={ drink.idDrink }
              strRecipe={ drink.strDrink }
              strRecipeThumb={ drink.strDrinkThumb }
            />

          ))
      }
      </section>

      <button
        className="border-primary rounded-lg border-2 p-1 w-full text-white
        bg-primary disabled:bg-gray-200 disabled:text-gray-500 hover:bg-purple
        font-bold bottom-0 fixed"
        type="submit"
        data-testid="start-recipe-btn"
      >
        Start Recipe

      </button>
    </>

  );
}
