import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DRINKS_URL, MEALS_URL } from '../utils/apiInfo';
import useFetch from '../hooks/useFetch';
import RecipeCard from './RecipeCard';
import { IDrink, IMeal } from '../types/recipeTypes';

export default function Recipes() {
  const { pathname } = useLocation();
  const { fetchApi, isFetching } = useFetch();
  const [mealsData, setMealsData] = useState<IMeal[]>([]);
  const [drinksData, setDrinksData] = useState<IDrink[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<IMeal[]>([]);
  const [filteredDrinks, setFilteredDrinks] = useState<IDrink[]>([]);

  const getData = async () => {
    if (pathname === '/meals') {
      const mealsApi = await fetchApi(MEALS_URL);
      setMealsData(mealsApi);
      const filteredMealsApi = mealsApi.meals.filter((_e:IMeal, i:number) => i < 12);
      return setFilteredMeals(filteredMealsApi);
    }
    const drinksApi = await fetchApi(DRINKS_URL);
    setDrinksData(drinksApi);
    const filteredDrinksApi = drinksApi.drinks.filter((_e:IDrink, i:number) => i < 12);
    return setFilteredDrinks(filteredDrinksApi);
  };

  useEffect(() => {
    getData();
  }, []);

  if (isFetching) {
    return <p>Loading</p>;
  }

  return (
    <section className="grid grid-cols-3 sm:grid-cols-3 gap-8 px-2">
      {pathname === '/meals'
        ? filteredMeals.map((meal, index) => (
          <RecipeCard
            cardClass="flex flex-col items-center shadow-sm shadow-primary
            rounded-md w-fit group hover:-translate-y-2 transition"
            dataTestId={ `${index}-recipe-card` }
            dataTestIdTitle={ `${index}-card-name` }
            key={ meal.idMeal }
            index={ index }
            pathname="meals"
            idRecipe={ meal.idMeal }
            strRecipe={ meal.strMeal }
            strRecipeThumb={ meal.strMealThumb }
          />
        )) : filteredDrinks.map((drink, index) => (
          <RecipeCard
            cardClass="flex flex-col items-center shadow-sm shadow-primary
            rounded-md w-fit group hover:-translate-y-2 transition"
            dataTestId={ `${index}-recipe-card` }
            dataTestIdTitle={ `${index}-card-name` }
            key={ drink.idDrink }
            index={ index }
            pathname="drinks"
            idRecipe={ drink.idDrink }
            strRecipe={ drink.strDrink }
            strRecipeThumb={ drink.strDrinkThumb }
          />
        ))}
    </section>
  );
}
