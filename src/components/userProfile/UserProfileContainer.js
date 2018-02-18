import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Profile} from './profile.js';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

class UserProfileContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayUser: {},
      classrooms: [],
    };
  }

  async componentWillMount() {
    const {username} = this.props.match.params;

    try {
      let resp = await fetch(`/api/v1/users/${username}`, {
        credentials: 'same-origin',
      });
      resp = await resp.json();

      if (resp.status !== 200) throw resp;

      this.setState({
        displayUser: resp.data,
      });
    } catch (err) {
      if (err.status) alert(err.message);
      console.log(err);
    }
  }

  render() {
    return (
      <Profile {...this.props}
        displayUser={this.state.displayUser}
        classrooms={this.state.classrooms}
      />
    );
  }
}

UserProfileContainer.propTypes = {
  match: PropTypes.shape(),
};

export default connect(mapStateToProps)(UserProfileContainer);
