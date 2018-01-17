import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {
    Table, Row, Col, Button,
} from 'reactstrap';
import PropTypes from 'prop-types';

class Classroom extends Component {
  dataHTML() {
    const students = this.props.students;
    let tabulatedStudentsList = students.map((s, ind) => (
      <tr key={s._id}>
        <td>{ind + 1}</td>
        <td>{s.username}</td>
      </tr>
    ));
    return tabulatedStudentsList;
  }

  render() {
    const {classId} = this.props;
    return (
      <div>
        <Row>
          <Col>
            <h1>{this.props.name} </h1>
          </Col>
          <Col className='text-right'>
            <LinkContainer to={`/classroom/${classId}/addStudent`}>
              <Button color='primary'> Add Student </Button>
            </LinkContainer>
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
              <th> Index </th>
              <th> Username </th>
            </tr>
          </thead>
          <tbody>
            { this.dataHTML() }
          </tbody>
        </Table>
      </div>
    );
  }
}

/** PropTypes */
Classroom.propTypes = {
  classId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  students: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  })).isRequired,
};

export default Classroom;
