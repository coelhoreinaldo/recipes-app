import React, { useContext } from 'react';
import { RecipeDetailsContext } from '../../context/RecipeDetailsProvider';

import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import ShareButton from './ShareButton';

type Props = {
  recipeType: string;
  recipeId: string;
  testId?: string;
};

export default function ShareFavoriteButtons({
  recipeType, recipeId, testId = '',
}: Props) {
  const {
    currRecipe, handleFavoriteClick, isFavorite,
  } = useContext(RecipeDetailsContext);

  return (
    <section className="flex justify-between mx-6">
      <ShareButton recipeType={ recipeType } recipeId={ recipeId } testId={ testId } />
      <button onClick={ () => handleFavoriteClick(currRecipe) }>
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          data-testid="favorite-btn"
          alt="favorite icon"
        />
      </button>
    </section>
  );
}
