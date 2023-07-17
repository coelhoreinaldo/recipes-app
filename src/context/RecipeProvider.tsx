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
  getData: () => Promise<void>;
  getCategories: () => Promise<void>;
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

  const getData = useCallback(async () => {
    if (pathname === '/meals') {
      const mealsApi = await fetchApi(MEALS_URL);
      setMealsData(mealsApi);
      const filteredMealsApi = mealsApi.meals.filter((_e:IMeal, i:number) => i < 12);
      return setFilteredMeals(filteredMealsApi);
    }
    const drinksApi = await fetchApi(DRINKS_URL);
    setDrinksData(drinksApi);
    const filteredDrinksApi = drinksApi.drinks.filter((_e:IDrink, i:number) => i < 12);
    return setFilteredDrinks(filteredDrinksApi);
  }, [fetchApi, pathname]);

  const getCategories = useCallback(async () => {
    if (pathname === '/meals') {
      const mealsCategoriesData = await fetchApi(MEALS_CATEGORIES_URL);
      return setMealsCategories(mealsCategoriesData.meals
        .filter((_:string, i:number) => i < 5));
    }
    const drinksCategoriesData = await fetchApi(DRINKS_CATEGORIES_URL);
    setDrinksCategories(drinksCategoriesData.drinks
      .filter((_:string, i:number) => i < 5));
  }, [fetchApi, pathname]);

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
  }), [drinksCategories, drinksData, filteredDrinks,
    filteredMeals, getCategories, getData, isFetching, mealsCategories, mealsData]);

  return (
    <RecipeContext.Provider value={ values }>
      {children}
    </RecipeContext.Provider>
  );
}
