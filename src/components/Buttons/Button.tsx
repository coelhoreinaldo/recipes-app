import React from 'react';

type Props = {
  disabledCondition: boolean;
  text: string;
  testId: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  customClass?: string;
};

export default function Button({
  disabledCondition, text, testId, onClick, customClass = '' }: Props) {
  return (
    <button
      className={ `border-primary rounded-lg border-2 p-1 text-white
  bg-primary disabled:bg-gray-200 disabled:text-gray-500 hover:bg-purple
  font-bold transition duration-700 uppercase ${customClass}` }
      data-testid={ testId }
      disabled={ disabledCondition }
      type="submit"
      onClick={ onClick }
    >
      {text}

    </button>
  );
}
