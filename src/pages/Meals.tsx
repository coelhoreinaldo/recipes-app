import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

export default function Meals() {
  return (
    <main>
      <Header title="Meals" showSearchIcon />
      Meals
      <Recipes />
      <Footer />
    </main>
  );
}
