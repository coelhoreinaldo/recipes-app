// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// function useRecipeInfo() {
//   const { pathname } = useLocation();
//   const [recipeInfo, setRecipeInfo] = useState({
//     isMealRecipe: true,
//     recipeApi: 'meal',
//     recipeType: 'meals',
//     recipeId: 'idMeal',
//   });

//   const getRecipeInfo = () => {
//     if (pathname.includes('/drinks')) {
//       setRecipeInfo({
//         isMealRecipe: false,
//         recipeApi: 'cocktail',
//         recipeType: 'drinks',
//         recipeId: 'idDrink',
//       });
//     }
//   };

//   useEffect(() => {
//     getRecipeInfo();
//   }, []);

//   return {
//     recipeInfo,
//   };
// }

// export default useRecipeInfo;
