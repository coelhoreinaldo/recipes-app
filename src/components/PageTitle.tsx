import React from 'react';
import mealsIcon from '../images/Meals/allIcon.svg';
import drinksIcon from '../images/Drinks/allIcon.svg';
import doneRecipes from '../images/doneIcon.svg';
import favorites from '../images/favoritesIcon.svg';
import profile from '../images/profilePageIcon.svg';

type Props = { title : string };

type Icons = {
  [key: string]: string;
};

export default function PageTitle({ title }: Props) {
  const icons:Icons = {
    Meals: mealsIcon,
    Drinks: drinksIcon,
    'Done Recipes': doneRecipes,
    Favorites: favorites,
    Profile: profile,
  };

  return (
    <section className="flex flex-col w-full items-center justify-center my-4">
      <img
        src={ icons[title] }
        alt={ title }
        width={ 64 }
        height={ 64 }
        className="h-10 w-10 md:h-16 md:w-16"
      />
      <p className="uppercase font-bold text-primary">{title}</p>
    </section>
  );
}
