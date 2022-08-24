import React from 'react';
import { Link } from 'react-router-dom';

class ProfileInfo extends React.Component {
  handleLogout = () => {
    localStorage.clear('user');
  }

  render() {
    const userKey = localStorage.getItem('user');
    const userEmail = JSON.parse(userKey);
    return (
      <div className="recipes">
        <h5 data-testid="profile-email">{ userEmail?.email }</h5>
        <Link to="/done-recipes">
          <button type="button" data-testid="profile-done-btn">Done Recipes</button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => this.handleLogout() }
          >
            Logout
          </button>
        </Link>
      </div>
    );
  }
}

export default ProfileInfo;
