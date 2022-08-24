import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import propTypes from 'prop-types';

class DoneRecipes extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Header title="Done Recipes" searchByBarOn={ () => 'teste' } />
      </div>
    );
  }
}

// DoneRecipes.propTypes = {
//   history: propTypes.shape({
//     push: propTypes.func,
//   }).isRequired,
//   userLoginDispatch: propTypes.func.isRequired,
// };

// const mapDispatchToProps = (dispatch) => ({
//   userLoginDispatch: (email, password) => dispatch(userLogin(email, password)),
// });

export default connect(null, null)(DoneRecipes);
