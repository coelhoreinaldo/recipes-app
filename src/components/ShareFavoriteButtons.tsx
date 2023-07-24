import React, { useContext } from 'react';
import { RecipeDetailsContext } from '../context/RecipeDetailsProvider';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function ShareFavoriteButtons() {
  const {
    currRecipe, handleShareClick, showLinkCopied, handleFavoriteClick, isFavorite,
  } = useContext(RecipeDetailsContext);

  return (
    <section className="flex justify-between mx-6">
      <button data-testid="share-btn" onClick={ handleShareClick }>
        {showLinkCopied ? <p>Link copied!</p> : (
          <img src={ shareIcon } alt="share icon" />
        )}
      </button>
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
