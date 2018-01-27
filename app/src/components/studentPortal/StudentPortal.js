import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {
    Table, Row, Col, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

/** Setting List */

function SettingsList({classId, name}) {
  return (
    <UncontrolledDropdown>
     <DropdownToggle className='fa fa-lg fa-cog' color='light'></DropdownToggle>
     <DropdownMenu>

      <LinkContainer to={`/classroom/${classId}/addStudent`}>
        <DropdownItem>
           <Button color='primary' className='btn-block'> Add Student </Button>
        </DropdownItem>
      </LinkContainer>

      <LinkContainer to={`/classroom/${classId}/removeStudent`}>
        <DropdownItem>
          <Button color='danger' className='btn-block'>Remove Student</Button>
        </DropdownItem>
      </LinkContainer>

     </DropdownMenu>
   </UncontrolledDropdown>
 );
}

SettingsList.propTypes = {
  classId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

/** Student List */

function StudentPortal({students, classId, name}) {
  let tabulatedStudentsList = students.map((s, ind) => (
    <tr key={s._id}>
      <td>{ind + 1}</td>
      <td>{s.username}</td>
    </tr>
  ));
  return (
    <div className='text-center'>
      <Row>
        <Col>
          <h1>Student Portal</h1>
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
          { tabulatedStudentsList }
        </tbody>
      </Table>
    </div>
  );
}

StudentPortal.propTypes = {
  classId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  students: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  })).isRequired,
};

export default StudentPortal;
