import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipeContext } from '../../context/RecipeProvider';
import allDrinks from '../../assets/Drinks/allIcon.svg';
import ordinaryDrink from '../../assets/Drinks/ordinaryDrinkIcon.svg';
import cocktail from '../../assets/Drinks/cocktailIcon.svg';
import shake from '../../assets/Drinks/shakeIcon.svg';
import other from '../../assets/Drinks/otherIcon.svg';
import cocoa from '../../assets/Drinks/cocoaIcon.svg';
import allMeals from '../../assets/Meals/allIcon.svg';
import beef from '../../assets/Meals/beefIcon.svg';
import goat from '../../assets/Meals/goatIcon.svg';
import chicken from '../../assets/Meals/chickenIcon.svg';
import breakfast from '../../assets/Meals/breakfastIcon.svg';
import dessert from '../../assets/Meals/dessertIcon.svg';

type Props = {
  strCategory: string,
  testId?: string,
  onClick: () => void,
};

interface IconMap {
  [key: string]: string;
}

export default function CategoryButton({ strCategory, testId = '', onClick }: Props) {
  const { currCategory } = useContext(RecipeContext);
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
    <div className="flex flex-col items-center relative mb-8 group">
      <button
        className={ `group-hover:border-primary 
        transition rounded-full h-10 w-10 flex md:h-16 md:w-16
        items-center justify-center text-sm px-2 border-2
      ${isActive ? 'border-primary' : 'border-secondary'}` }
        data-testid={ testId }
        onClick={ onClick }
        role={ strCategory }
        type="button"
      >
        <img
          src={ icons[strCategory] }
          alt={ strCategory }
          className={ `${isActive ? 'hue-rotate-30' : ''} group-hover:hue-rotate-30` }
        />
      </button>
      <span
        className={ `group-hover:text-primary transition h-10 text-xs md:text-sm absolute
      text-center -bottom-10 ${isActive ? 'text-primary' : 'text-slate-500'}` }
      >
        {strCategory}

      </span>
    </div>
  );
}
