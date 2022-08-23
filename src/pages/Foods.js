import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Foods extends React.Component {
  render() {
    const { meals } = this.props;
    if (meals.length === 1) return <Redirect to={ `/foods/${meals[0].idMeal}` } />;
    return (
      <div>
        <Header title="Foods" />
      </div>
    );
  }
}

Foods.propTypes = {
  meals: propTypes.shape({
    length: propTypes.func,
    idMeal: propTypes.string,
  }).isRequired,
};

const mapStateToProps = (store) => ({
  meals: store.recipeReducer.meals,
});

// const mapDispatchToProps = (dispatch) => ({
//   userLoginDispatch: (email, password) => dispatch(userLogin(email, password)),
// });

export default connect(mapStateToProps, null)(Foods);
