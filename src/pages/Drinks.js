import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Drinks extends React.Component {
  render() {
    const { drinks } = this.props;
    if (drinks.length === 1) return <Redirect to={ `/drinks/${drinks[0].idDrink}` } />;
    return (
      <div>
        <Header title="Drinks" />
        { drinks.map((drink, index) => {
          const { strDrink, strDrinkThumb } = drink;
          return (
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <h3 data-testid={ `${index}-card-name` }>{ strDrink }</h3>
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${index}-card-img` }
                width="200"
                height="200"
              />
            </div>
          );
        }) }
        <Footer />
      </div>
    );
  }
}

Drinks.propTypes = {
  drinks: propTypes.arrayOf(propTypes.object).isRequired,
};

const mapStateToProps = (store) => ({
  drinks: store.recipeReducer.drinks,
});
// const mapDispatchToProps = (dispatch) => ({
//   userLoginDispatch: (email, password) => dispatch(userLogin(email, password)),
// });

export default connect(mapStateToProps, null)(Drinks);
