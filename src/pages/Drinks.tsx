import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes/Recipes';

export default function Drinks() {
  return (
    <div>
      <Header title="Drinks 🍹" showSearchIcon />
      <Recipes />
      <Footer />
    </div>
  );
}
