import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import favoritesIcon from '../images/favoritesIcon.svg';
import doneIcon from '../images/doneIcon.svg';
import logoutIcon from '../images/logoutIcon.svg';
import PageTitle from '../components/PageTitle';

export default function Profile() {
  const userEmail = JSON.parse(localStorage.getItem('user')
   || '{"email": "test@test.com"}');
  return (
    <div>
      <Header title="Profile" />
      <PageTitle title="Profile" />
      <section
        className="w-full flex flex-col items-center justify-evenly h-full px-12"
      >
        <h3 data-testid="profile-email" className="font-bold">{userEmail.email}</h3>
        <section
          className="flex flex-col justify-center items-center
          section divide-y-2 divide-primary gap-4 w-full text-lg"
        >
          <Link
            to="/done-recipes"
            className="w-full pt-4 flex items-center gap-2 px-2"
            data-testid="profile-done-btn"
          >
            <img width="40" src={ doneIcon } alt="" />
            <span>Done Recipes</span>
          </Link>
          <Link
            to="/favorite-recipes"
            className="w-full pt-4 flex items-center gap-2 px-2"
            data-testid="profile-favorite-btn"
          >
            <img width="40" src={ favoritesIcon } alt="" />
            <span>Favorite Recipes</span>
          </Link>
          <Link
            to="/"
            className="w-full pt-4 flex items-center gap-2 px-2"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            <img width="40" src={ logoutIcon } alt="" />
            <span>Logout</span>
          </Link>
        </section>
      </section>
      <Footer />
    </div>
  );
}
