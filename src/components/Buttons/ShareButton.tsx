import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';

type Props = {
  customClass?: string;
  testId?: string;
  recipeType: string;
  recipeId: string;
};

export default function ShareButton({
  customClass = '', recipeType, recipeId, testId = '',
}: Props) {
  const [showLinkCopied, setShowLinkCopied] = useState('');

  const handleShareClick = () => {
    copy(`${window.location.origin}/${recipeType}/${recipeId}`);
    console.log(`${window.location.origin}/${recipeType}/${recipeId}`);

    setShowLinkCopied(recipeId);
  };

  return (
    <button
      className={ customClass }
      type="button"
      onClick={ handleShareClick }
    >
      { showLinkCopied === recipeId ? <p>Link copied!</p> : <img
        src={ shareIcon }
        alt="Share"
        data-testid={ testId }
      />}
    </button>
  );
}
