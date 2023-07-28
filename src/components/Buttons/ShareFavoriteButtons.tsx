import React, { useContext } from 'react';
import { RecipeDetailsContext } from '../../context/RecipeDetailsProvider';

import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import ShareButton from './ShareButton';

type Props = {
  recipeType: string;
  recipeId: string;
  testId?: string;
  customClass?: string;
};

export default function ShareFavoriteButtons({
  recipeType, recipeId, testId = '', customClass = '',
}: Props) {
  const {
    currRecipe, handleFavoriteClick, isFavorite,
  } = useContext(RecipeDetailsContext);

  return (
    <section className={ ` ${customClass}` }>
      <ShareButton recipeType={ recipeType } recipeId={ recipeId } testId={ testId } />
      <button onClick={ () => handleFavoriteClick(currRecipe) }>
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          data-testid="favorite-btn"
          alt="favorite icon"
          width={ 32 }
        />
      </button>
    </section>
  );
}
