import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DRINKS_CATEGORIES_URL,
  DRINKS_URL, MEALS_CATEGORIES_URL, MEALS_URL } from '../utils/apiInfo';
import useFetch from '../hooks/useFetch';
import RecipeCard from './RecipeCard';
import { Category, IDrink, IMeal } from '../types/recipeTypes';
import CategoryButton from './CategoryButton';

export default function Recipes() {
  const { pathname } = useLocation();
  const { fetchApi, isFetching } = useFetch();
  const [mealsData, setMealsData] = useState<IMeal[]>([]);
  const [drinksData, setDrinksData] = useState<IDrink[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<IMeal[]>([]);
  const [filteredDrinks, setFilteredDrinks] = useState<IDrink[]>([]);
  const [mealsCategories, setMealsCategories] = useState<Category[]>([]);
  const [drinksCategories, setDrinksCategories] = useState<Category[]>([]);

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

  const getCategories = async () => {
    if (pathname === '/meals') {
      const mealsCategoriesData = await fetchApi(MEALS_CATEGORIES_URL);
      return setMealsCategories(mealsCategoriesData.meals
        .filter((_:string, i:number) => i < 5));
    }
    const drinksCategoriesData = await fetchApi(DRINKS_CATEGORIES_URL);
    setDrinksCategories(drinksCategoriesData.drinks
      .filter((_:string, i:number) => i < 5));
  };

  useEffect(() => {
    getData();
    getCategories();
  }, []);

  if (isFetching) {
    return <p>Loading</p>;
  }

  return (
    <main className="mt-4 mb-16">
      <section className="flex justify-between px-2">
        {pathname === '/meals'
          ? mealsCategories.map(({ strCategory }) => (
            <CategoryButton key={ strCategory } strCategory={ strCategory } />
          )) : drinksCategories.map(({ strCategory }) => (
            <CategoryButton key={ strCategory } strCategory={ strCategory } />
          ))}

      </section>
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-8 px-2 mt-4">
        {pathname === '/meals'
          ? filteredMeals.map((meal, index) => (
            <RecipeCard
              cardClass="flex flex-col overflow-hidden items-center shadow-sm
              shadow-primary rounded-md w-full group hover:-translate-y-2 transition"
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
              cardClass="flex flex-col overflow-hidden items-center shadow-sm
              shadow-primary rounded-md w-full group hover:-translate-y-2 transition"
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
    </main>
  );
}
