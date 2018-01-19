import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {
    Table, Row, Col, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

function SettingsList({classId, name}) {
  return (
    <UncontrolledDropdown>
     <DropdownToggle className='fa fa-lg fa-cog' color='light'></DropdownToggle>
     <DropdownMenu>

       <DropdownItem>
         <LinkContainer to={`/classroom/${classId}/addStudent`}>
           <Button color='primary'> Add Student </Button>
         </LinkContainer>
       </DropdownItem>

       <DropdownItem>
         <LinkContainer to={{
           pathname: `/classroom/${classId}/deleteClass`,
           state: {
             name: name,
           },
         }}>
           <Button color='danger'> Delete Class </Button>
         </LinkContainer>
       </DropdownItem>
     </DropdownMenu>
   </UncontrolledDropdown>
 );
}

SettingsList.propTypes = {
  classId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

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
    const {classId, name} = this.props;
    return (
      <div>
        <Row>
          <Col>
            <h1>{this.props.name} </h1>
          </Col>
          <Col className='text-right'>
            <SettingsList classId={classId} name={name}/>
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
