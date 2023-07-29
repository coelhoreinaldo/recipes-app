import React from 'react';
import mealsIcon from '../assets/Meals/allIcon.svg';
import drinksIcon from '../assets/Drinks/allIcon.svg';
import doneRecipes from '../assets/doneIcon.svg';
import favorites from '../assets/favoritesIcon.svg';
import profile from '../assets/profilePageIcon.svg';

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
      <h2
        className="uppercase font-bold text-primary"
        data-testid="page-title"
      >
        {title}

      </h2>
    </section>
  );
}
