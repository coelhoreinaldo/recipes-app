import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import RecipeCard from '../components/RecipeCard';
import { getApiInfo } from '../utils/apiInfo';

export default function RecipeDetails() {
  const params = useParams();
  const { fetchApi } = useFetch();
  const { pathname } = useLocation();
  const [currRecipe, setCurrRecipe] = useState([]);

  const getData = async () => {
    const { recipeApi, recipeType } = getApiInfo(pathname);
    const API_URL = `https://www.the${recipeApi}db.com/api/json/v1/1/lookup.php?i=${params.id}`;
    const recipeData = await fetchApi(API_URL);
    return setCurrRecipe(recipeData[recipeType]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      RecipeDetails
      {/* {
      pathname.includes('meals')
        ? currRecipe.map((meal, index) => (
          <RecipeCard
            dataTestId={ `${index}-recipe-card` }
            dataTestIdTitle={ `${index}-card-name` }
            key={ meal.idMeal }
            index={ index }
            pathname="meals"
            idRecipe={ meal.idMeal }
            strRecipe={ meal.strMeal }
            strRecipeThumb={ meal.strMealThumb }
          />
        )) : currRecipe.map((drink, index) => (
          <RecipeCard
            dataTestId={ `${index}-recipe-card` }
            dataTestIdTitle={ `${index}-card-name` }
            key={ drink.idDrink }
            index={ index }
            pathname="drinks"
            idRecipe={ drink.idDrink }
            strRecipe={ drink.strDrink }
            strRecipeThumb={ drink.strDrinkThumb }
          />
        ))
    } */}
    </div>
  );
}
