import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function RecipeDetails() {
  const params = useParams();
  const { pathname } = useLocation();
  console.log(pathname);
  const { fetchApi } = useFetch();

  const getData = async () => {
    const isMealsPage = pathname.includes('meals');
    let recipeApi = 'cocktail';
    let recipeType = 'drinks';
    // let recipeId = 'idDrink';
    if (isMealsPage) {
      recipeApi = 'meal';
      recipeType = 'meals';
      // recipeId = 'idMeal';
    }
    const API_URL = `https://www.the${recipeApi}db.com/api/json/v1/1/lookup.php?i=${params.id}`;
    const recipeData = await fetchApi(API_URL);
    console.log(recipeData[recipeType]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>RecipeDetails</div>
  );
}
