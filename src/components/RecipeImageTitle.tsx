import React from 'react';
import ShareFavoriteButtons from './Buttons/ShareFavoriteButtons';

type Props = {
  strThumb: string;
  strName: string;
  strCategory: string;
  strAlcoholic?: string;
  recipeType: string;
  recipeId: string;
};

export default function RecipeImageTitle({
  strThumb,
  strName,
  strCategory,
  strAlcoholic = '',
  recipeType,
  recipeId,
}: Props) {
  return (
    <section className="relative h-64 flex items-center justify-center">
      <img
        src={ strThumb }
        alt={ strName }
        data-testid="recipe-photo"
        className="w-full h-full object-cover absolute"
      />
      <h2
        className="bottom-0 left-0 text-4xl font-bold w-full flex
          uppercase justify-center items-center text-center bg-black
          bg-opacity-60 h-full text-white p-2 z-50"
        data-testid="recipe-title"
      >
        {strName}

      </h2>
      <div
        className="z-50 absolute flex justify-between w-full top-4
          text-secondary items-center font-bold px-4"
      >
        <h4
          data-testid="recipe-category"
        >
          {strCategory}
          {strAlcoholic && ` - ${strAlcoholic}`}
        </h4>
        <ShareFavoriteButtons
          testId="share-btn"
          recipeType={ recipeType }
          recipeId={ recipeId }
          customClass="flex gap-4"
        />

      </div>
    </section>
  );
}
