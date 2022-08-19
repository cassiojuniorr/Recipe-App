import React from 'react';
import { connect } from 'react-redux';
// import propTypes from 'prop-types';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        Home
      </div>
    );
  }
}

// Home.propTypes = {
//   history: propTypes.shape({
//     push: propTypes.func,
//   }).isRequired,
//   userLoginDispatch: propTypes.func.isRequired,
// };

const mapDispatchToProps = (dispatch) => ({
  userLoginDispatch: (email, password) => dispatch(userLogin(email, password)),
});

export default connect(null, mapDispatchToProps)(Home);
