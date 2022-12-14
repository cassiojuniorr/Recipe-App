import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/footer.module.scss';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const { containerFooter, links } = style;
  return (
    <footer data-testid="footer" className={ containerFooter }>
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="drink icon"
          data-testid="drinks-bottom-btn"
          className={ links }
        />
      </Link>

      <Link to="/foods">
        <img
          src={ mealIcon }
          alt="meal icon"
          data-testid="food-bottom-btn"
          className={ links }
        />
      </Link>
    </footer>
  );
}

export default Footer;
