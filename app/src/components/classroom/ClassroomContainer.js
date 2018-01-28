import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Classroom from './Classroom.js';
import qs from 'qs';

class ClassroomContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      classId: this.props.match.params.classId,
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

      this.setState({
        students: resp.data.students,
        name: resp.data.name,
      });
    } catch (err) {
      if (err.status) alert(err.message);
      else console.log(err);
    }
  }

  render() {
    return (
      <Classroom
        name={this.state.name}
        classId={this.state.classId}
        students={this.state.students}
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
};


export default ClassroomContainer;
