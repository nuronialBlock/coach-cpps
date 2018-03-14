import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Classroom from './Classroom.js';
import qs from 'qs';

function mapStateToProps(state) {
  return {
    user: state.user,
    notifications: state.notifications,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    showNotification(msg) {
      dispatch(msg);
    },
  };
}

class ClassroomContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      classId: this.props.match.params.classId,
      coach: {},
      name: '',
    };
  }

  async componentWillMount() {
    const {classId} = this.props.match.params;
    try {
      let resp = await fetch(
        `/api/v1/classrooms/${classId}`, {
        credentials: 'same-origin',
      });
      resp = await resp.json();

      if (resp.status !== 200) throw resp;
      const userIds = resp.data.students.map((x)=>x._id);

      if (userIds.length) {
        const query = qs.stringify({
          classroomId: classId,
          userIds,
        });
        let ratingResp = await fetch(`/api/v1/ratings?${query}`, {
          credentials: 'same-origin',
        });
        ratingResp = await ratingResp.json();

        if (ratingResp.status !== 200) throw ratingResp;

        const userIdToRating = {};
        ratingResp.data.forEach((x)=>{
          userIdToRating[x.userId] = x.currentRating;
        });

        const students = resp.data.students;
        students.forEach((x)=>{
          x.currentRating = userIdToRating[x._id];
        });
      }

      this.setState({
        students: resp.data.students,
        name: resp.data.name,
        coach: resp.data.coach,
      });
    } catch (err) {
      if (err.status) alert(err.message);
      else console.log(err);
    }
  }

  render() {
    return (
      <Classroom
        {...this.props}
        name={this.state.name}
        classId={this.state.classId}
        students={this.state.students}
        user={this.props.user}
        coach={this.state.coach}
        owner={this.state.coach._id === this.props.user.userId}
      />
    );
  }
}

ClassroomContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      classId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired,
  }).isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(ClassroomContainer);
