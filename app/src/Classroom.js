import React, {Component} from 'react';
import {
    Table,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

class Classroom extends Component {
  dataHTML() {
    const students = this.props.students;
    let tabulatedStudentsList = students.map((s, ind) => (
      <tr key={s._id}>
        <td>{ind}</td>
        <td>{s.username}</td>
      </tr>
    ));
    return tabulatedStudentsList;
  }

  render() {
    return (
      <div>
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
  students: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  })).isRequired,
};

export default Classroom;
