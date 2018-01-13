import React, {Component} from 'react';
import {
  Table,
  ButtonToolbar,
  Button,
} from 'react-bootstrap';
import Students from './Students';

// const classroute = 'api/v1/classroom';

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
        students: this.state.students.filter((x)=>x!==id),
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
        <td>{ data[1] }</td>
        <td>
          <ButtonToolbar>
            <Button
              onClick={ () => this.handleShowStudents(data[3], data[1]) }>
              Enter
            </Button>
            <Button onClick={ () => this.handleDelete(data[1]) }>Delete</Button>
          </ButtonToolbar>
        </td>
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
      <div>
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
            <Students
                onAddStudent={ this.handleNewStudent }
                onShow={ this.handleShowStudents }
                showModal={ this.state.showStudents }
                classId= {this.state.classId}
                studentsList= { this.state.students }
                deleteStudent= { this.deleteStudent}
            />
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Landing;
