import React, { useContext } from 'react';
import { RecipeDetailsContext } from '../../context/RecipeDetailsProvider';
import shareIcon from '../../images/shareIcon.svg';

type Props = {
  customClass?: string;
};

export default function ShareButton({ customClass = '' }: Props) {
  const { handleShareClick, showLinkCopied } = useContext(RecipeDetailsContext);
  return (
    <button
      data-testid="share-btn"
      onClick={ handleShareClick }
      className={ customClass }
    >
      {showLinkCopied ? <p>Link copied!</p> : (
        <img src={ shareIcon } alt="share icon" />
      )}
    </button>
  );
}
