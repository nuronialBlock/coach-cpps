import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Table,
  Row,
  Col,
} from 'reactstrap';
import PropTypes from 'prop-types';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showStudents: false,
      students: [],
      classId: '',
    };

    this.handleNewStudent = this.handleNewStudent.bind(this);
    this.handleShowStudents = this.handleShowStudents.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.dataHTML = this.dataHTML.bind(this);
    this.landingDataRepresentation = this.landingDataRepresentation.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  handleNewStudent(data) {
    this.props.onAddStudent(data);
  }

  handleDelete(e) {
    this.props.onDelete(e);
  }

  handleShowStudents(students, classId) {
    this.setState({
        students,
        classId,
        showStudents: !this.state.showStudents,
    });
  }

  async deleteStudent(id) {
    const api = `/api/v1/classrooms/${this.state.classId}/students/${id}`;
    try {
      let resp = await fetch(api, {
        method: 'DELETE',
        credentials: 'same-origin',
      });
      resp = await resp.json();
      if (resp.status !== 200) throw resp;
      this.setState({
        students: this.state.students.filter((x)=>x._id!==id),
      });
      this.props.refreshData();
    } catch (err) {
      console.log(err);
      if ( err.message ) alert(err.message);
    }
  }

  dataHTML(data) {
    return (
      <tr key={data[1]}>
        <td>{ data[2] }</td>
        <td>{ data[0] }</td>
        <td><Link to={`/classroom/${data[1]}`}>{data[1]}</Link></td>
     </tr>
    );
  }

  landingDataRepresentation(data) {
      if (data === null || data === undefined) {
          return;
      }
      let rows = [];
      for (let i = 0; i < data.length; i++) {
          const obj = data[i];
          const element = [obj.name, obj._id];
          element.push(i+1);
          element.push(obj.students);
          let dataX = this.dataHTML(element);
          rows.push(dataX);
      }
      return rows;
  }

  render() {
    return (
      <Row>
        <Col>
          <Table className="table table-hover" hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Classroom</th>
                <th>Class ID</th>
              </tr>
            </thead>
            <tbody>
              { this.landingDataRepresentation(this.props.classData) }
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

/** PropTypes */

Landing.propTypes = {
  onAddStudent: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
  classData: PropTypes.array.isRequired,
};

export default Landing;
