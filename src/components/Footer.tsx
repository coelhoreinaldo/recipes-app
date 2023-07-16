import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer className="fixed bottom-0" data-testid="footer">
      <Link to="/drinks" data-testid="drink-btn-link">
        <img src={ drinkIcon } alt="drink icon" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals" data-testid="meal-btn-link">
        <img src={ mealIcon } alt="drink icon" data-testid="meals-bottom-btn" />
      </Link>
    </footer>
  );
}
