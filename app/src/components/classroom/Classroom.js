import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {
    Row, Col, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import StudentPortal from './StudentPortal';
import ContestPortalContainer from './ContestPortalContainer';

/** Setting List */

function SettingsList({classId, name}) {
  return (
    <UncontrolledDropdown>
     <DropdownToggle className='fa fa-lg fa-cog' color='light'></DropdownToggle>
     <DropdownMenu>
      <LinkContainer to={{
        pathname: `/classroom/${classId}/deleteClass`,
        state: {
          name: name,
        },
        }}>
         <DropdownItem>
          <Button color='danger' className='btn-block'> Delete Class </Button>
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

class Classroom extends Component {
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
        <hr/>
        <Row>
          <Col>
            <StudentPortal
              students={this.props.students}
              classId={classId}
              name={name}
            />
          </Col>
          <Col>
            <ContestPortalContainer classId={classId} />
          </Col>
        </Row>
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
