import React, {Component} from 'react';
import {Modal, Button, Table} from 'react-bootstrap';

class Students extends Component {
  constructor(props) {
    super(props);
    this.dataHTML = this.dataHTML.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  dataHTML() {
    const data = this.props.studentsList;
    if (data === undefined || data === null) {
        return;
    }
    let tabulatedStudentsList = data.map((id, ind) => (
      <tr key={id}>
        <td>{ind}</td>
        <td>{id}</td>
        <td>
          <Button
            className="btn btn-danger"
            onClick={()=>this.props.deleteStudent(id)}
          >
              Delete
          </Button>
        </td>
      </tr>
    ));
    return tabulatedStudentsList;
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
              <Button onClick={this.toggleShow}>Close</Button>
          </Modal.Footer>
      </Modal>
    );
  }
}

export default Students;
