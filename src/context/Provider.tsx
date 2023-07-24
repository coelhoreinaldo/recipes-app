import React from 'react';
import RecipeProvider from './RecipeProvider';
import RecipeDetailsProvider from './RecipeDetailsProvider';

export default function Provider({ children }:{ children: React.ReactNode }) {
  return (
    <RecipeProvider>
      <RecipeDetailsProvider>
        {children}
      </RecipeDetailsProvider>
    </RecipeProvider>
  );
}
