import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer className="fixed bottom-0" data-testid="footer">
      <Link to="/drinks">
        <img src={ drinkIcon } alt="drink icon" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <img src={ mealIcon } alt="drink icon" data-testid="meals-bottom-btn" />
      </Link>
    </footer>
  );
}
