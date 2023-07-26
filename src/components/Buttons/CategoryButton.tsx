import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipeContext } from '../../context/RecipeProvider';
import allDrinks from '../../images/Drinks/allIcon.svg';
import ordinaryDrink from '../../images/Drinks/ordinaryDrinkIcon.svg';
import cocktail from '../../images/Drinks/cocktailIcon.svg';
import shake from '../../images/Drinks/shakeIcon.svg';
import other from '../../images/Drinks/otherIcon.svg';
import cocoa from '../../images/Drinks/cocoaIcon.svg';
import allMeals from '../../images/Meals/allIcon.svg';
import beef from '../../images/Meals/beefIcon.svg';
import goat from '../../images/Meals/goatIcon.svg';
import chicken from '../../images/Meals/chickenIcon.svg';
import breakfast from '../../images/Meals/breakfastIcon.svg';
import dessert from '../../images/Meals/dessertIcon.svg';

type Props = {
  strCategory: string,
};

interface IconMap {
  [key: string]: string;
}

export default function CategoryButton({ strCategory }: Props) {
  const { handleCategoryClick, currCategory } = useContext(RecipeContext);
  const { pathname } = useLocation();
  const icons:IconMap = {
    All: allDrinks,
    'Ordinary Drink': ordinaryDrink,
    Cocktail: cocktail,
    Shake: shake,
    'Other / Unknown': other,
    Cocoa: cocoa,
    Beef: beef,
    Chicken: chicken,
    Goat: goat,
    Breakfast: breakfast,
    Dessert: dessert,
  };

  if (pathname.includes('meal')) {
    icons.All = allMeals;
  }

  const isActive = currCategory === strCategory;

  return (
    <div className="flex flex-col items-center relative mb-8">
      <button
        className={ `rounded-full h-10 w-11 flex 
        items-center justify-center text-sm px-2 border-2
      ${isActive ? 'border-primary' : 'border-secondary'}` }
        data-testid={ `${strCategory}-category-filter` }
        onClick={ () => handleCategoryClick(strCategory) }
        role={ strCategory }
      >
        <img src={ icons[strCategory] } alt="" srcSet="" />
      </button>
      <span
        className={ `h-10 text-xs absolute
      text-center -bottom-10 ${isActive ? 'text-primary' : 'text-slate-500'}` }
      >
        {strCategory}

      </span>
    </div>
  );
}
