import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/profilePeople.module.scss';

class ProfileInfo extends React.Component {
  handleLogout = () => {
    localStorage.clear('user');
  }

  render() {
    const userKey = localStorage.getItem('user');
    const userEmail = JSON.parse(userKey);
    const { containerProfile, emailProf, wrapBtn, btnPages } = style;
    return (
      <div className={ containerProfile }>
        <h5
          data-testid="profile-email"
          className={ emailProf }
        >
          { userEmail?.email }
        </h5>
        <div className={ wrapBtn }>
          <Link to="/done-recipes">
            <button
              type="button"
              data-testid="profile-done-btn"
              className={ btnPages }
            >
              Done Recipes
            </button>
          </Link>
          <Link to="/favorite-recipes">
            <button
              type="button"
              data-testid="profile-favorite-btn"
              className={ btnPages }
            >
              Favorite Recipes
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              data-testid="profile-logout-btn"
              className={ btnPages }
              onClick={ () => this.handleLogout() }
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ProfileInfo;
