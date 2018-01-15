import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Classroom from './Classroom.js';

class ClassroomContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
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
      });
    } catch (err) {
      if (err.status) alert(err.message);
      else console.log(err);
    }
  }

  render() {
    return (
      <Row>
        <Classroom students={this.state.students} />
      </Row>
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
