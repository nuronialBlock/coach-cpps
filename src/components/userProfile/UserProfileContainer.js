import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Profile} from './Profile.js';
import qs from 'qs';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

class UserProfileContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      displayUser: {},
      classrooms: [],
    };

    this.updateOjStats = this.updateOjStats.bind(this);
  }

  updateOjStats(newOjStats) {
    const displayUser = this.state.displayUser;
    this.setState({
      displayUser: {
        ...displayUser,
        ojStats: newOjStats,
      },
    });
  }

  async loadProfile(currentProps) {
    const {username} = currentProps.match.params;

    try {
      let resp = await fetch(`/api/v1/users/${username}`, {
        credentials: 'same-origin',
      });
      resp = await resp.json();

      if (resp.status !== 200) throw resp;
      const displayUser = resp.data;

      resp = await fetch(`/api/v1/users/${username}/root-stats`, {
        credentials: 'same-origin',
      });
      resp = await resp.json();
      const userRootStats = resp.data;
      displayUser.userRootStats = userRootStats;

      resp = await fetch(`/api/v1/users/username-userId/${username}`, {
        credentials: 'same-origin',
      });
      resp = await resp.json();
      const userId = resp.data;

      const query = {
        student: userId,
        select: '_id name coach',
        populate: ['coach', 'username'],
      };

      resp = await fetch(`/api/v1/classrooms?${qs.stringify(query)}`, {
        credentials: 'same-origin',
      });
      resp = await resp.json();
      const classrooms = resp.data;

      this.setState({
        displayUser,
        userId,
        classrooms,
      });
    } catch (err) {
      if (err.status) alert(err.message);
      console.log(err);
    }
  }

  async componentWillMount() {
    this.loadProfile(this.props);
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps === this.props) return;
    this.loadProfile(nextProps);
  }

  render() {
    return (
      <Profile {...this.props}
        displayUser={this.state.displayUser}
        classrooms={this.state.classrooms}
        updateOjStats={this.updateOjStats}
      />
    );
  }
}

UserProfileContainer.propTypes = {
  match: PropTypes.shape(),
};

export default connect(mapStateToProps)(UserProfileContainer);
