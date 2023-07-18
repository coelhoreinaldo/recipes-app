import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const userEmail = JSON.parse(localStorage.getItem('user')
   || '{"email": "test@test.com"}');
  return (
    <div>
      <Header title="Profile" />
      <section className="w-full flex flex-col items-center">
        <h3 data-testid="profile-email">{userEmail.email}</h3>
        <section
          className="flex flex-col justify-center items-center
          section divide-y-4 divide-primary gap-4"
        >
          <Link
            to="/done-recipes"
            className="w-full text-center"
            data-testid="profile-done-btn"
          >
            Done Recipes

          </Link>
          <Link
            to="/favorite-recipes"
            className="w-full text-center"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </Link>
          <Link
            to="/"
            className="w-full text-center"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            Logout

          </Link>
        </section>
      </section>
      <Footer />
    </div>
  );
}
