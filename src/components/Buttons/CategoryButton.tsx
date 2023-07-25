import React, { useContext } from 'react';
import { RecipeContext } from '../../context/RecipeProvider';

type Props = {
  strCategory: string,
};

export default function CategoryButton({ strCategory }: Props) {
  const { handleCategoryClick, currCategory } = useContext(RecipeContext);
  return (
    <button
      className={ `rounded-full h-10 w-12  text-sm px-2 
      ${currCategory === strCategory ? 'bg-primary' : 'bg-secondary'}` }
      data-testid={ `${strCategory}-category-filter` }
      onClick={ () => handleCategoryClick(strCategory) }
    >
      {strCategory}
    </button>
  );
}
