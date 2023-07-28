import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import PageTitle from '../components/PageTitle';
import Recipes from '../components/Recipes/Recipes';
import { RecipeContext } from '../context/RecipeProvider';

export default function Meals() {
  const { isFetching } = useContext(RecipeContext);
  return (
    <main>
      <Header showSearchIcon />
      {isFetching && <Loading />}
      <PageTitle title="Meals" />
      <Recipes />
      <Footer />
    </main>
  );
}
