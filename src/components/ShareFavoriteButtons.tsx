import React, { useContext } from 'react';
import { RecipeDetailsContext } from '../context/RecipeDetailsProvider';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import ShareButton from './Buttons/ShareButton';

export default function ShareFavoriteButtons() {
  const {
    currRecipe, handleFavoriteClick, isFavorite,
  } = useContext(RecipeDetailsContext);

  return (
    <section className="flex justify-between mx-6">
      <ShareButton />
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
