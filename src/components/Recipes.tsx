import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import CategoryButton from './Buttons/CategoryButton';
import { RecipeContext } from '../context/RecipeProvider';
import { Category, IDrink, IMeal } from '../types/recipeTypes';
import Loading from './Loading';

export default function Recipes() {
  const { pathname } = useLocation();
  const {
    filteredMeals, filteredDrinks, mealsCategories, drinksCategories,
    isFetching, getData, getCategories,
  } = useContext(RecipeContext);

  useEffect(() => {
    getData();
    getCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <main className="mt-4 mb-16">
      <section className="flex justify-between px-2">
        <CategoryButton strCategory="All" data-testid="All-category-filter" />
        {pathname === '/meals'
          ? mealsCategories.map(({ strCategory }:Category) => (
            <CategoryButton key={ strCategory } strCategory={ strCategory } />
          )) : drinksCategories.map(({ strCategory }:Category) => (
            <CategoryButton key={ strCategory } strCategory={ strCategory } />
          ))}
      </section>
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-8 px-2 mt-4">
        {pathname === '/meals'
          ? filteredMeals.map((meal:IMeal, index:number) => (
            <RecipeCard
              dataTestId={ `${index}-recipe-card` }
              dataTestIdTitle={ `${index}-card-name` }
              key={ meal.idMeal }
              index={ index }
              idRecipe={ meal.idMeal }
              strRecipe={ meal.strMeal }
              strRecipeThumb={ meal.strMealThumb }
              pathname="meals/"
            />
          )) : filteredDrinks.map((drink:IDrink, index:number) => (
            <RecipeCard
              dataTestId={ `${index}-recipe-card` }
              dataTestIdTitle={ `${index}-card-name` }
              key={ drink.idDrink }
              index={ index }
              idRecipe={ drink.idDrink }
              strRecipe={ drink.strDrink }
              strRecipeThumb={ drink.strDrinkThumb }
              pathname="drinks/"
            />
          ))}
      </section>
    </main>
  );
}
