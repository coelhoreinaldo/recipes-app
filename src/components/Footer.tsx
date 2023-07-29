import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import drinkIcon from '../assets/drinkIcon.svg';
import mealIcon from '../assets/mealIcon.svg';
import { RecipeContext } from '../context/RecipeProvider';

export default function Footer() {
  const { setCurrCategory } = useContext(RecipeContext);
  const navigate = useNavigate();
  const pathname = useLocation();
  const handleClick = () => {
    setCurrCategory('All');
    if (pathname.pathname === '/meals') {
      return navigate('/drinks');
    }
    return navigate('/meals');
  };

  return (
    <footer
      className="fixed bottom-0 flex bg-primary w-full justify-between px-4 py-2 z-50"
      data-testid="footer"
    >
      <Link
        to="/drinks"
        data-testid="drink-btn-link"
        onClick={ handleClick }
      >
        <img src={ drinkIcon } alt="drink icon" data-testid="drinks-bottom-btn" />
      </Link>
      <Link
        to="/meals"
        data-testid="meal-btn-link"
        onClick={ handleClick }
      >
        <img
          src={ mealIcon }
          alt="drink icon"
          data-testid="meals-bottom-btn"
          width={ 40 }
          height={ 40 }
        />
      </Link>
    </footer>
  );
}
