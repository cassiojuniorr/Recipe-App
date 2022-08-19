import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import propTypes from 'prop-types';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <Header title="Profile" />
      </div>
    );
  }
}

// Header.propTypes = {
//   title: propTypes.string.isRequired,
// };

// const mapDispatchToProps = (dispatch) => ({
//   userLoginDispatch: (email, password) => dispatch(userLogin(email, password)),
// });

export default connect(null, null)(Profile);
