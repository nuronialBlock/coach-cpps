import React from 'react';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {
    Table, Row, Col, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

/** Setting List */

function SettingsList({classId}) {
  return (
    <UncontrolledDropdown>
     <DropdownToggle className='fa fa-lg fa-cog' color='light'></DropdownToggle>
     <DropdownMenu>

      <LinkContainer to={`/classroom/${classId}/contest/add-contest`}>
        <DropdownItem>
           <Button color='primary' className='btn-block'> Add Contest </Button>
        </DropdownItem>
      </LinkContainer>

     </DropdownMenu>
   </UncontrolledDropdown>
 );
}

SettingsList.propTypes = {
  classId: PropTypes.string.isRequired,
};

/** Standings List */

function SingleContest(props) {
  const {classId, data} = props;
  let tabulatedContestList = data.map((s, ind) => (
    <tr key={s._id}>
      <td>{s.position}</td>
      <td>{s.username}</td>
      <td>{s.previousRating}</td>
      <td>{s.newRating}</td>
    </tr>
  ));
  return (
    <div className='text-center'>
      <Row>
        <Col>
          <h1>Contest Details</h1>
        </Col>
        <Col className='text-right'>
          <SettingsList classId={classId}/>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th> Position </th>
            <th> Username </th>
            <th> Previous Rating </th>
            <th> New Rating </th>
          </tr>
        </thead>
        <tbody>
          { tabulatedContestList }
        </tbody>
      </Table>
    </div>
  );
}

SingleContest.propTypes = {
  classId: PropTypes.string.isRequired,
  contestId: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    previousRating: PropTypes.number.isRequired,
    newRating: PropTypes.number.isRequired,
  })).isRequired,
};

export default SingleContest;
