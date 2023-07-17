import React from 'react';

type Props = {
  strCategory: string,
};

export default function CategoryButton({ strCategory }: Props) {
  return (
    <button
      className="rounded-full h-10 w-12 bg-secondary text-sm px-2"
      data-testid={ `${strCategory}-category-filter` }
    >
      {strCategory}
    </button>
  );
}
