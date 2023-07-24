// /* 37 – Desenvolva a tela de modo que ela contenha uma imagem da receita, um título, a categoria (em caso de comidas) e se é ou não alcoólico (em caso de bebidas), uma lista de ingredientes (com as quantidades e instruções necessárias)
// Observações técnicas
// Verifica se os atributos data-testid estão presentes na tela:

// A foto deve ter o atributo data-testid="recipe-photo".
// O título deve ter o atributo data-testid="recipe-title".
// O botão de compartilhar deve ter o atributo data-testid="share-btn".
// O botão de favoritar deve ter o atributo data-testid="favorite-btn".
// O texto da categoria deve ter o atributo data-testid="recipe-category".
// O elemento de instruções deve ter o atributo data-testid="instructions".
// O botão para finalizar a receita deve ter o atributo data-testid="finish-recipe-btn". */

import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IRecipeDetails } from '../types/recipeTypes';
import { RecipeDetailsContext } from '../context/RecipeDetailsProvider';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function RecipesInProgress() {
  const [recipeInProgress, setRecipeInProgress] = useState({} as IRecipeDetails);
  const { currRecipe, handleShareClick, showLinkCopied, handleFavoriteClick, isFavorite,
  } = useContext(RecipeDetailsContext);
  const { strThumb,
    strName, strCategory, strAlcoholic, strInstructions } = recipeInProgress;

  useEffect(() => {
    setRecipeInProgress(currRecipe);
  }, []);

  return (
    <div>
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
        <h4
          data-testid="recipe-category"
          className="z-50 absolute top-4 text-secondary font-bold left-4"
        >
          {strCategory}
          {strAlcoholic && ` - ${strAlcoholic}`}
        </h4>
      </section>
      <section className="mx-4">
        <h3 className="text-lg font-extrabold">Instructions</h3>
        <p
          className="flex gap-2 p-2 border-primary border-2"
          data-testid="instructions"
        >
          {strInstructions}
        </p>
      </section>
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
      <Link
        to="/profile"
        className="border-primary rounded-lg border-2 p-1 w-full text-white
        bg-primary disabled:bg-gray-200 disabled:text-gray-500 hover:bg-purple
        font-bold bottom-0 fixed text-center"
        type="submit"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe

      </Link>
    </div>
  );
}
