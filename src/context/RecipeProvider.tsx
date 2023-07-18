import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Category, IDrink, IMeal } from '../types/recipeTypes';
import { DRINKS_CATEGORIES_URL, DRINKS_URL,
  MEALS_CATEGORIES_URL, MEALS_URL } from '../utils/apiInfo';

export interface RecipeContextProps {
  mealsData: IMeal[];
  drinksData: IDrink[];
  filteredMeals: IMeal[];
  filteredDrinks: IDrink[];
  mealsCategories: Category[];
  drinksCategories: Category[];
  isFetching: boolean;
  currCategory: string;
  setFilteredMeals: (value: IMeal[]) => void;
  setFilteredDrinks: (value: IDrink[]) => void; //
  getData: () => Promise<void>;
  getCategories: () => Promise<void>;
  handleCategoryClick: (query:string) => Promise<void>;
}

export const RecipeContext = createContext<RecipeContextProps>({} as RecipeContextProps);

export default function RecipeProvider({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { fetchApi, isFetching } = useFetch();
  const [mealsData, setMealsData] = useState<IMeal[]>([]);
  const [drinksData, setDrinksData] = useState<IDrink[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<IMeal[]>([]);
  const [filteredDrinks, setFilteredDrinks] = useState<IDrink[]>([]);
  const [mealsCategories, setMealsCategories] = useState<Category[]>([]);
  const [drinksCategories, setDrinksCategories] = useState<Category[]>([]);
  const [currCategory, setCurrCategory] = useState('All');

  const getData = useCallback(async () => {
    if (pathname === '/meals') {
      const mealsApi = await fetchApi(MEALS_URL);
      setMealsData(mealsApi.meals);
      const filteredMealsApi = mealsApi.meals.slice(0, 12);
      return setFilteredMeals(filteredMealsApi);
    }
    const drinksApi = await fetchApi(DRINKS_URL);
    setDrinksData(drinksApi.drinks);
    const filteredDrinksApi = drinksApi.drinks.slice(0, 12);
    return setFilteredDrinks(filteredDrinksApi);
  }, [fetchApi, pathname]);

  const getCategories = useCallback(async () => {
    if (pathname === '/meals') {
      const mealsCategoriesData = await fetchApi(MEALS_CATEGORIES_URL);
      return setMealsCategories(mealsCategoriesData.meals.slice(0, 5));
    }
    const drinksCategoriesData = await fetchApi(DRINKS_CATEGORIES_URL);
    setDrinksCategories(drinksCategoriesData.drinks.slice(0, 5));
  }, [fetchApi, pathname]);

  const handleCategoryClick = useCallback(async (query:string) => {
    if (query === 'All' || currCategory === query) {
      setFilteredMeals(mealsData.slice(0, 12));
      setCurrCategory('All');
      return setFilteredDrinks(drinksData.slice(0, 12));
    }
    const MEALS_BY_CATEGORY = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`;
    const DRINKS_BY_CATEGORY = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${query}`;
    if (pathname === '/meals') {
      const mealsApi = await fetchApi(MEALS_BY_CATEGORY);
      setCurrCategory(query);
      return setFilteredMeals(mealsApi.meals.slice(0, 12));
    }
    const drinksApi = await fetchApi(DRINKS_BY_CATEGORY);
    setCurrCategory(query);
    return setFilteredDrinks(drinksApi.drinks.slice(0, 12));
  }, [drinksData, fetchApi, mealsData, pathname, currCategory]);

  const values = useMemo(() => ({
    mealsData,
    drinksData,
    filteredMeals,
    filteredDrinks,
    mealsCategories,
    drinksCategories,
    isFetching,
    getData,
    getCategories,
    handleCategoryClick,
    currCategory,
    setFilteredDrinks,
    setFilteredMeals,
  }), [drinksCategories, drinksData, filteredDrinks,
    filteredMeals, getCategories, currCategory,
    getData, isFetching, mealsCategories,
    mealsData, handleCategoryClick, setFilteredMeals, setFilteredDrinks]);

  return (
    <RecipeContext.Provider value={ values }>
      {children}
    </RecipeContext.Provider>
  );
}
