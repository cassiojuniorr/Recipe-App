import React from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import propTypes from 'prop-types';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <Header title="Profile" />
        <Footer />
      </div>
    );
  }
}

export default connect(null, null)(Profile);
