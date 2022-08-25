import React from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import ProfileInfo from '../components/ProfileInfo';
import Header from '../components/Header';

class Profile extends React.Component {
  searchByBarOn = () => {}

  render() {
    console.log(this.searchByBarOn());
    return (
      <div>
        <Header title="Profile" searchByBarOn={ this.searchByBarOn } />
        <ProfileInfo />
        <Footer />
      </div>
    );
  }
}

export default connect(null, null)(Profile);
