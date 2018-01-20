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

/** Contest List */

function ContestPortal(props) {
  const {classId, data} = props;
  let tabulatedContestList = data.map((s, ind) => (
    <tr key={s._id}>
      <td>{ind + 1}</td>
      <td>{s.name}</td>
    </tr>
  ));
  return (
    <div className='text-center'>
      <Row>
        <Col>
          <h1>Contest Portal</h1>
        </Col>
        <Col className='text-right'>
          <SettingsList classId={classId}/>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th> Index </th>
            <th> Contest </th>
          </tr>
        </thead>
        <tbody>
          { tabulatedContestList }
        </tbody>
      </Table>
    </div>
  );
}

ContestPortal.propTypes = {
  classId: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default ContestPortal;
