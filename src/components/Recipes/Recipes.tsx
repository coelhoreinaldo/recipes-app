import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import CategoryButton from '../Buttons/CategoryButton';
import { RecipeContext } from '../../context/RecipeProvider';
import { Category, IDrink, IMeal } from '../../types/recipeTypes';

export default function Recipes() {
  const { pathname } = useLocation();
  const {
    filteredMeals, filteredDrinks, mealsCategories, drinksCategories,
    getData, getCategories, handleCategoryClick,
  } = useContext(RecipeContext);

  useEffect(() => {
    getData();
    getCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mb-20">
      <section className="flex justify-between px-2">
        <CategoryButton
          strCategory="All"
          testId="All-category-filter"
          onClick={ () => handleCategoryClick('All') }

        />
        {pathname === '/meals'
          ? mealsCategories.map(({ strCategory }:Category) => (
            <CategoryButton
              key={ strCategory }
              strCategory={ strCategory }
              testId={ `${strCategory}-category-filter` }
              onClick={ () => handleCategoryClick(strCategory) }
            />
          )) : drinksCategories.map(({ strCategory }:Category) => (
            <CategoryButton
              key={ strCategory }
              strCategory={ strCategory }
              testId={ `${strCategory}-category-filter` }
              onClick={ () => handleCategoryClick(strCategory) }
            />
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
