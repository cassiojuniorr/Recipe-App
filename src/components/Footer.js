import React from 'react';
import style from '../styles/footer.module.scss';

function Footer() {
  const { containerFooter } = style;
  return (
    <div data-testid="footer" className={ containerFooter }>
      <svg
        src="../imagens/drinkIcon.svg"
        alt="drink icon"
        data-testid="drinks-bottom-btn"
      />
      <svg
        src="../imagens/mealIcon.svg"
        alt="meal icon"
        data-testid="food-bottom-btn"
      />
    </div>
  );
}

export default Footer;
