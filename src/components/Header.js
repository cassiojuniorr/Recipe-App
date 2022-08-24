import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import style from '../styles/header.module.scss';

class Header extends React.Component {
  render() {
    const { title, searchActivated, toggleSearchInput } = this.props;
    const { containerHeader, links } = style;
    return (
      <div className={ containerHeader }>
        <h2 data-testid="page-title">{title}</h2>
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profileIcon"
            className={ links }
          />
        </Link>
        { (title !== 'Profile' && title !== 'Done Recipes'
        && title !== 'Favorite Recipes') && (
          <div>
            <button type="button" onClick={ toggleSearchInput }>
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="searchIcon"
                className={ links }
              />
            </button>
            { searchActivated && <SearchBar pageActual={ title } /> }
          </div>
        ) }
      </div>
    );
  }
}

Header.propTypes = {
  title: propTypes.string.isRequired,
  searchActivated: propTypes.bool.isRequired,
  toggleSearchInput: propTypes.func.isRequired,
};

export default connect(null, null)(Header);
