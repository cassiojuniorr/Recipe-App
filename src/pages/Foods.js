import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Foods extends React.Component {
  render() {
    const { meals } = this.props;
    if (meals.length === 1) return <Redirect to={ `/foods/${meals[0].idMeal}` } />;
    return (
      <div>
        <Header title="Foods" />
        { meals.map((meal, index) => {
          const { strMeal, strMealThumb } = meal;
          return (
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
              <img
                src={ strMealThumb }
                alt={ strMeal }
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

Foods.propTypes = {
  meals: propTypes.arrayOf(propTypes.object).isRequired,
};

const mapStateToProps = (store) => ({
  meals: store.recipeReducer.meals,
});

// const mapDispatchToProps = (dispatch) => ({
//   userLoginDispatch: (email, password) => dispatch(userLogin(email, password)),
// });

export default connect(mapStateToProps, null)(Foods);
