import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import style from '../styles/header.module.scss';

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
    const { title, searchByBarOn } = this.props;
    const { searchActivated } = this.state;

    const { containerHeader, btnFav } = style;
    return (
      <div>
        <div className={ containerHeader }>
          <h2 data-testid="page-title">{title}</h2>
          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profileIcon"
            />
          </Link>
          {
            (title !== 'Profile' && title !== 'Done Recipes'
              && title !== 'Favorite Recipes')
              && (
                <button
                  type="button"
                  onClick={ this.toggleSearchInput }
                  className={ btnFav }
                >
                  <img
                    data-testid="search-top-btn"
                    src={ searchIcon }
                    alt="searchIcon"
                  />
                </button>
              )
          }

        </div>
        { searchActivated && (
          <SearchBar
            pageActual={ title }
            searchByBarOn={ searchByBarOn }
          />)}
      </div>
    );
  }
}

Header.propTypes = {
  title: propTypes.string.isRequired,
  searchByBarOn: propTypes.func.isRequired,
};

export default connect(null, null)(Header);
