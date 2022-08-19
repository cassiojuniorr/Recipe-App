import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import propTypes from 'prop-types';

class Drinks extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Header title="Drinks" />
      </div>
    );
  }
}

// Drinks.propTypes = {
//   history: propTypes.shape({
//     push: propTypes.func,
//   }).isRequired,
//   userLoginDispatch: propTypes.func.isRequired,
// };

// const mapDispatchToProps = (dispatch) => ({
//   userLoginDispatch: (email, password) => dispatch(userLogin(email, password)),
// });

export default connect(null, null)(Drinks);
