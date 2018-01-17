import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Form,
  Button,
  Input,
  Label,
  FormGroup,
} from 'reactstrap';

class AddClassroom extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      name: '',
      students: '',
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <h1> Add Classroom </h1>
        <Form>
          <FormGroup controlId={'ClassRoom'}>
            <Label>{'Add Class'}</Label>
            <Input
              placeholder={'Classroom Name'}
              onChange={ this.updateName }
            />
            <Label>{'Add Students ID'}</Label>
            <Input
              placeholder={'Student IDs'}
              onChange={ this.updateStudents }
            />
          </FormGroup>
        </Form>
        <Button className='btn btn-primary' onClick={this.handleSave}>Save</Button>
        <Button className='btn btn-secondary ml-1'> <Link to='/coach'> Cancel </Link> </Button>
      </div>
    );
  }
}

export default AddClassroom;
