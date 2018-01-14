import React, {Component} from 'react';
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

class AddClassroom extends Component {
  constructor(props) {
    super(props);
    this.handleShowToggle = this.handleShowToggle.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateStudents = this.updateStudents.bind(this);
    this.state = {
      show: this.props.showModal,
      className: '',
      students: '',
    };
  }

  updateName(e) {
    this.setState({
      className: e.target.value,
    });
  }

  updateStudents(e) {
    this.setState({
      students: e.target.value,
    });
  }

  handleSave(e) {
    this.props.onShow();
    this.props.onSave(this.state);
  }

  handleShowToggle() {
    this.props.onShow();
  }

  render() {
    return (
      <div>
        <Modal show={this.props.showModal}>
          <Modal.Header>
            <Modal.Title>Add Classroom</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId={'ClassRoom'}>
                <ControlLabel>{'Add Class'}</ControlLabel>
                <FormControl
                  placeholder={'Classroom Name'}
                  onChange={ this.updateName }
                />
                <ControlLabel>{'Add Students ID'}</ControlLabel>
                <FormControl
                  placeholder={'Student IDs'}
                  onChange={ this.updateStudents }
                />
            </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSave}>Save</Button>
            <Button onClick={this.handleShowToggle}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

AddClassroom.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
};

export default AddClassroom;
