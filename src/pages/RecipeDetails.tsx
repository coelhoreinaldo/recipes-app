import { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import useFetch from '../hooks/useFetch';
import { getApiInfo, getIngredientsAndMeasures } from '../utils/apiFunctions';
import RecipeDetailsCard from '../components/RecipeDetailsCard';
import { IDoneRecipe, IDrink, IMeal, IRecipeDetails } from '../types/recipeTypes';
import RecipeCard from '../components/RecipeCard';
import { getLocalStorageDoneRecipes,
  getLocalStorageInProgressRecipes,
  verifyFavoriteInStorage } from '../utils/localStorageFunctions';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';

export default function RecipeDetails() {
  const params = useParams();
  const { fetchApi, isFetching } = useFetch();
  const { pathname } = useLocation();
  const isMeal = pathname.includes('meals');
  const { recipeApi, recipeType } = getApiInfo(pathname);
  const [currRecipe, setCurrRecipe] = useState<IRecipeDetails>({
    strThumb: '',
    strName: '',
    strCategory: '',
    recipeIngredients: [],
    recipeMeasures: [],
    strAlcoholic: '',
    strInstructions: '',
    strYoutube: '',
    strArea: '',
  });
  const {
    strThumb, strName, strCategory, recipeIngredients,
    recipeMeasures, strInstructions, strYoutube, strAlcoholic,
  } = currRecipe;
  const [recommendations, setRecommendations] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [favorites, setFavorites] = useLocalStorage('favoriteRecipes', []);

  const getData = async () => {
    const API_URL = `https://www.the${recipeApi}db.com/api/json/v1/1/lookup.php?i=${params.id}`;
    const recipeData = await fetchApi(API_URL);
    const recipeInfo = recipeData[recipeType][0];
    setIsDone(getLocalStorageDoneRecipes(recipeInfo));
    setIsInProgress(getLocalStorageInProgressRecipes(recipeInfo, recipeType));
    setIsFavorite(verifyFavoriteInStorage(recipeInfo));
    const { ingredients, measures } = getIngredientsAndMeasures(recipeInfo);
    if (isMeal) {
      const embed = recipeInfo.strYoutube.replace('watch?v=', 'embed/');
      recipeInfo.strYoutube = embed;
    }
    return setCurrRecipe({
      strThumb: recipeInfo.strMealThumb || recipeInfo.strDrinkThumb,
      strName: recipeInfo.strMeal || recipeInfo.strDrink,
      strCategory: recipeInfo.strCategory,
      strAlcoholic: recipeInfo.strAlcoholic || '',
      recipeIngredients: ingredients,
      recipeMeasures: measures,
      strInstructions: recipeInfo.strInstructions,
      strYoutube: recipeInfo.strYoutube || '',
      strArea: recipeInfo.strArea || '',
    });
  };

  const getRecommendations = async () => {
    let recommendationsData = await fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    if (!isMeal) {
      recommendationsData = await fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
    recommendationsData = recommendationsData.meals || recommendationsData.drinks;
    return setRecommendations(recommendationsData.slice(0, 6));
  };

  const handleShareClick = () => {
    setShowLinkCopied(true);
    copy(window.location.href);
  };

  const handleFavoriteClick = (item: IRecipeDetails) => {
    const recipeInfo = {
      id: params.id,
      type: isMeal ? 'meal' : 'drink',
      nationality: item.strArea,
      category: item.strCategory,
      alcoholicOrNot: item.strAlcoholic || '',
      name: item.strName,
      image: item.strThumb,
    };
    if (isFavorite) {
      const favoritesUpdated = favorites
        .filter((favorite:IDoneRecipe) => favorite.id !== params.id);
      setFavorites([...favoritesUpdated]);
    }
    if (!isFavorite) {
      setFavorites([...favorites, recipeInfo]);
    }
    return setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    getData();
    getRecommendations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) {
    return <p data-testid="loading">Loading</p>;
  }

  return (
    <div className="pb-12">
      {isMeal
        ? <RecipeDetailsCard
            strThumb={ strThumb }
            strName={ strName }
            strCategory={ strCategory }
            strAlcoholic={ strAlcoholic }
            recipeIngredients={ recipeIngredients }
            recipeMeasures={ recipeMeasures }
            strInstructions={ strInstructions }
            strYoutube={ strYoutube }
            isMeal
        />
        : <RecipeDetailsCard
            strThumb={ strThumb }
            strName={ strName }
            strCategory={ strCategory }
            strAlcoholic={ strAlcoholic }
            recipeIngredients={ recipeIngredients }
            recipeMeasures={ recipeMeasures }
            strInstructions={ strInstructions }
            strYoutube={ strYoutube }
        />}
      <section
        className="flex items-center m-4 rounded-lg
        min-h-[190px] overflow-x-auto max-w-full gap-x-4"
      >
        {
        !isMeal
          ? recommendations.map((meal:IMeal, index) => (
            <RecipeCard
              minWidth="min-w-[160px]"
              dataTestId={ `${index}-recommendation-card` }
              dataTestIdTitle={ `${index}-recommendation-title` }
              key={ meal.idMeal }
              index={ index }
              idRecipe={ meal.idMeal }
              strRecipe={ meal.strMeal }
              strRecipeThumb={ meal.strMealThumb }
            />
          ))
          : recommendations.map((drink:IDrink, index) => (
            <RecipeCard
              minWidth="min-w-[160px]"
              dataTestId={ `${index}-recommendation-card` }
              dataTestIdTitle={ `${index}-recommendation-title` }
              key={ drink.idDrink }
              index={ index }
              idRecipe={ drink.idDrink }
              strRecipe={ drink.strDrink }
              strRecipeThumb={ drink.strDrinkThumb }
            />

          ))
      }
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

      {!isDone
      && (
        <Link
          to={ `/${recipeType}/${params.id}/in-progress` }
          className="border-primary rounded-lg border-2 p-1 w-full text-white
        bg-primary disabled:bg-gray-200 disabled:text-gray-500 hover:bg-purple
        font-bold bottom-0 fixed text-center"
          type="submit"
          data-testid="start-recipe-btn"
        >

          {isInProgress ? 'Continue Recipe' : 'Start Recipe'}

        </Link>)}

    </div>

  );
}
