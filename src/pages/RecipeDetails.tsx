import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getApiInfo } from '../utils/apiFunctions';
import RecipeDetailsCard from '../components/Recipes/RecipeDetailsCard';
import { IDrink, IMeal } from '../types/recipeTypes';
import RecipeCard from '../components/Recipes/RecipeCard';
import { RecipeDetailsContext } from '../context/RecipeDetailsProvider';
import Loading from '../components/Loading';
import Button from '../components/Buttons/Button';

export default function RecipeDetails() {
  const { id } = useParams();
  const { fetchApi, isFetching } = useFetch();
  const { pathname } = useLocation();
  let recipeId = pathname.split('/')[2];
  if (id) {
    recipeId = id;
  }
  const isMeal = pathname.includes('meals');
  const { recipeType } = getApiInfo(pathname);
  const {
    currRecipe, isInProgress, isDone, getRecipeDetailsById,
  } = useContext(RecipeDetailsContext);
  const {
    strThumb, strName, strCategory, recipeIngredients,
    recipeMeasures, strInstructions, strYoutube, strAlcoholic,
  } = currRecipe;
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  const getRecommendations = async () => {
    let recommendationsData = await fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    if (!isMeal) {
      recommendationsData = await fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
    recommendationsData = recommendationsData.meals || recommendationsData.drinks;
    return setRecommendations(recommendationsData.slice(0, 6));
  };

  useEffect(() => {
    getRecipeDetailsById();
    getRecommendations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="pb-12">
      <RecipeDetailsCard
        strThumb={ strThumb }
        strName={ strName }
        strCategory={ strCategory }
        strAlcoholic={ strAlcoholic }
        recipeIngredients={ recipeIngredients }
        recipeMeasures={ recipeMeasures }
        strInstructions={ strInstructions }
        strYoutube={ strYoutube }
        isMeal={ isMeal }
        recipeType={ recipeType }
        recipeId={ recipeId }
      />
      <section
        className="flex items-center m-2 rounded-lg px-2
        min-h-[210px] overflow-x-auto max-w-full gap-x-4"
      >
        {
        !isMeal
          ? recommendations.map((meal:IMeal, index) => (
            <RecipeCard
              minWidth="min-w-[160px]"
              dataTestId={ `${index}-recommendation-card` }
              dataTestIdTitle={ `${index}-recommendation-title` }
              key={ `${meal.idMeal}${index}` }
              index={ index }
              idRecipe={ meal.idMeal }
              strRecipe={ meal.strMeal }
              strRecipeThumb={ meal.strMealThumb }
              pathname="meals/"
            />
          ))
          : recommendations.map((drink:IDrink, index) => (
            <RecipeCard
              minWidth="min-w-[160px]"
              dataTestId={ `${index}-recommendation-card` }
              dataTestIdTitle={ `${index}-recommendation-title` }
              key={ `${drink.idDrink}${index}` }
              index={ index }
              idRecipe={ drink.idDrink }
              strRecipe={ drink.strDrink }
              strRecipeThumb={ drink.strDrinkThumb }
              pathname="drinks/"
            />

          ))
      }
      </section>
      {!isDone
      && (
        <div className="w-full flex justify-center">
          <Button
            testId="start-recipe-btn"
            text={ isInProgress ? 'Continue Recipe' : 'Start Recipe' }
            onClick={ () => navigate(`/${recipeType}/${recipeId}/in-progress`) }
            disabledCondition={ false }
            customClass="bottom-4 fixed w-11/12"
          />
        </div>
      )}

    </div>

  );
}
