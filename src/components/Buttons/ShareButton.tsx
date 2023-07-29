import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../../assets/shareIcon.svg';

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
    setShowLinkCopied(recipeId);
  };

  return (
    <button
      className={ customClass }
      type="button"
      onClick={ handleShareClick }
    >
      { showLinkCopied === recipeId ? <p className="text-xs">Link copied!</p> : <img
        src={ shareIcon }
        alt="Share"
        data-testid={ testId }
        width={ 24 }
      />}
    </button>
  );
}
