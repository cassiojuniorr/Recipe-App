import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Drinks extends React.Component {
  render() {
    const { drinks } = this.props;
    if (drinks.length === 1) return <Redirect to={ `/drinks/${drinks[0].idDrink}` } />;
    return (
      <div>
        <Header title="Drinks" />
      </div>
    );
  }
}

Drinks.propTypes = {
  drinks: propTypes.shape({
    length: propTypes.func,
    idDrink: propTypes.string,
  }).isRequired,
};

const mapStateToProps = (store) => ({
  drinks: store.recipeReducer.drinks,
});
// const mapDispatchToProps = (dispatch) => ({
//   userLoginDispatch: (email, password) => dispatch(userLogin(email, password)),
// });

export default connect(mapStateToProps, null)(Drinks);
