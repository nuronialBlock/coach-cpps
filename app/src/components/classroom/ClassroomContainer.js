import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Classroom from './Classroom.js';

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
    try {
      let resp = await fetch(
        `/api/v1/classrooms/${this.props.match.params.classId}`, {
        credentials: 'same-origin',
      });
      resp = await resp.json();

      if (resp.status !== 200) throw resp;
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
