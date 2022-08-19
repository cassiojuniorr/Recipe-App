import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      searchActivated: false,
    };
  }

  toggleSearchInput = () => {
    const { searchActivated } = this.state;
    this.setState({ searchActivated: !searchActivated });
  }

  render() {
    const { title } = this.props;
    const { searchActivated } = this.state;
    return (
      <div>
        <h2 data-testid="page-title">{title}</h2>
        <Link to="/profile">
          <svg
            data-testid="profile-top-btn"
            src="../images/profileIcon.svg"
            alt="profileIcon"
          />
        </Link>
        { (title !== 'Profile' && title !== 'Done Recipes'
        && title !== 'Favorite Recipes') && (
          <div>
            <svg
              data-testid="search-top-btn"
              src="../images/searchIcon.svg"
              alt="searchIcon"
              onClick={ this.toggleSearchInput }
            />
            { searchActivated && <input type="text" data-testid="search-input" /> }
          </div>
        ) }
      </div>
    );
  }
}

Header.propTypes = {
  title: propTypes.string.isRequired,
};

export default connect(null, null)(Header);
