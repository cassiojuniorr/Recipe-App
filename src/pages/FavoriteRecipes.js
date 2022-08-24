import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import propTypes from 'prop-types';

class FavoriteRecipes extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  searchByBarOn = () => {}

  render() {
    console.log(this.searchByBarOn());
    return (
      <div>
        <Header title="Favorite Recipes" searchByBarOn={ this.searchByBarOn } />
      </div>
    );
  }
}

// FavoriteRecipes.propTypes = {
//   history: propTypes.shape({
//     push: propTypes.func,
//   }).isRequired,
//   userLoginDispatch: propTypes.func.isRequired,
// };

// const mapDispatchToProps = (dispatch) => ({
//   userLoginDispatch: (email, password) => dispatch(userLogin(email, password)),
// });

export default connect(null, null)(FavoriteRecipes);
