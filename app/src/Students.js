import React, {Component} from 'react';
import {
    Modal,
    Button,
    Table,
    FormGroup,
    ControlLabel,
    FormControl,
    Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
        student: '',
    };
    this.handleSaveStudent = this.handleSaveStudent.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.dataHTML = this.dataHTML.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  dataHTML() {
    const data = this.props.studentsList;
    if (data === undefined || data === null) {
        return;
    }
    let tabulatedStudentsList = data.map((student, ind) => (
      <tr key={student._id}>
        <td>{ind}</td>
        <td>{student.username}</td>
        <td>
          <Button
            className="btn btn-danger"
            onClick={()=>this.props.deleteStudent(student._id)}
          >
              Delete
          </Button>
        </td>
      </tr>
    ));
    return tabulatedStudentsList;
  }

  handleSaveStudent() {
    this.props.onShow();
    this.props.onAddStudent({
      classId: this.props.classId,
      student: this.state.student,
    });
  }

  updateStudent(e) {
    this.setState({
      student: e.target.value,
    });
  }

  toggleShow() {
    this.props.onShow();
  }

  render() {
    return (
      <Modal show={this.props.showModal}>
        <Modal.Header>
            <Modal.Title>Students</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th> Index </th>
                <th> Username </th>
                <th> Delete </th>
              </tr>
            </thead>
            <tbody>
              { this.dataHTML() }
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
            <Form inline>
              <FormGroup controlId={'Student'} bsClass={'pull-left'}>
                  <ControlLabel>{'Add Student'}</ControlLabel> {' '}
                  <FormControl
                      placeholder={'Student Username'}
                      onChange={ this.updateStudent }
                  />
              </FormGroup>
              <Button onClick={this.handleSaveStudent} >Save</Button>{ ' ' }
              <Button onClick={this.toggleShow}>Close</Button>
            </Form>
        </Modal.Footer>
      </Modal>
    );
  }
}

/** PropTypes */
Students.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onShow: PropTypes.func.isRequired,
  onAddStudent: PropTypes.func.isRequired,
  classId: PropTypes.string.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  studentsList: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  })),
};

export default Students;
